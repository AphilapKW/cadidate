import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import entities from './default/entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [
        ConfigModule.forRoot({
          cache: true,
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: parseInt(configService.get<string>('POSTGRES_PORT'), 10),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        synchronize: false,
        logging: false,
        entities: [...entities],
        namingStrategy: new SnakeNamingStrategy(),
        subscribers: [],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
