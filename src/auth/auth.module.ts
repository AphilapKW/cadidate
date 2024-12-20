import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UsersService } from 'src/users/service/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../database/default/entity';
import { AuthController } from './controller/auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([...entities])],
  providers: [ConfigService, AuthService, UsersService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
