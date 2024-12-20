import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../database/default/entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([...entities])],
  providers: [UsersService],
})
export class UsersModule {}
