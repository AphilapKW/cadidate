import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CandidatesEntity } from './candidate.entity';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('change_logs')
export class ChangeLogEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  action: string; // e.g., 'create' or 'update'

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.changeLog, {
    eager: true,
  })
  user: UserEntity;

  @ManyToOne(() => CandidatesEntity, (candidates) => candidates.changeLogs, {
    onDelete: 'CASCADE',
  })
  candidates: CandidatesEntity;
}
