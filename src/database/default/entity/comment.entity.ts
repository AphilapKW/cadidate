import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { CandidatesEntity } from './candidate.entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  detail: string;

  @ManyToOne(() => UserEntity, (user) => user.comment)
  user: UserEntity;

  @ManyToOne(() => CandidatesEntity, (candidates) => candidates.comment)
  candidates: CandidatesEntity;
}
