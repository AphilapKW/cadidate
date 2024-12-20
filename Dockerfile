FROM node:20-alpine AS base

ENV WORKDIR /usr/src/app

## Dependency
FROM base as deps

WORKDIR ${WORKDIR}

COPY .yarn .yarn
COPY package.json yarn.lock .
RUN yarn install --immutable

## Builder
FROM base as builder

WORKDIR ${WORKDIR}

COPY --from=deps ${WORKDIR}/node_modules ./node_modules
COPY .yarn .yarn
COPY package.json yarn.lock .
COPY .eslintrc.js nest-cli.json tsconfig.build.json tsconfig.json .
COPY src ./src

RUN yarn build

## Default
FROM base

RUN apk update && apk add bash

WORKDIR ${WORKDIR}

COPY --from=deps ${WORKDIR}/node_modules ./node_modules
COPY --from=builder ${WORKDIR}/dist ./dist
COPY .yarn .yarn
COPY package.json yarn.lock tsconfig.json .
COPY src/database ./src/database
COPY src/constant ./src/constant

RUN chown -R 1001:0 /usr/src/app/ && chmod -R ug+rwx /usr/src/app/
USER 1001

EXPOSE 3000
CMD ["yarn", "start:prod"]
