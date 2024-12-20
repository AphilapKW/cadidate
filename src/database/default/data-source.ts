import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import entities from './entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [...entities],
  migrationsTableName: 'typeorm_migration',
  migrations: [__dirname + '/migration/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
});
