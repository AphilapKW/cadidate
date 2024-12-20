import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { CandidatesEntity } from './candidate.entity';
import { ChangeLogEntity } from './change-log.entity';
import { CommentEntity } from './comment.entity';
import { UserPasswordEntity } from './user-password.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => CandidatesEntity, (candidates) => candidates.user)
  candidates: CandidatesEntity[];

  @OneToMany(() => ChangeLogEntity, (changeLog) => changeLog.user)
  changeLog: ChangeLogEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comment: CommentEntity[];

  @OneToOne(() => UserPasswordEntity, (userPassword) => userPassword.user)
  @JoinColumn()
  userPassword: UserPasswordEntity;
}
