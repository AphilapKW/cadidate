import { Module } from '@nestjs/common';
import { CandidateService } from './service/candidate.service';
import { CandidateController } from './controller/candidate.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../database/default/entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([...entities])],
  providers: [JwtService, CandidateService, UsersService],
  controllers: [CandidateController],
})
export class CandidateModule {}
