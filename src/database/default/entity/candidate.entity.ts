import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { StatusType } from 'src/constant/candidate';
import { ChangeLogEntity } from './change-log.entity';
import { CommentEntity } from './comment.entity';

@Entity('candidates')
export class CandidatesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text', { default: StatusType.TO_DO })
  status: StatusType;

  @Column({ default: false })
  isSaved: boolean;

  @ManyToOne(() => UserEntity, user => user.candidates)
  user: UserEntity;

  @OneToMany(() => ChangeLogEntity, changeLog => changeLog.candidates, {
    cascade: true,
  })
  changeLogs: ChangeLogEntity[];

  @OneToMany(() => CommentEntity, comment => comment.candidates, {
    cascade: true,
  })
  comment: CommentEntity[];
}
