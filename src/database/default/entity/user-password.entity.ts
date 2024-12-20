import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('users_password')
export class UserPasswordEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @OneToOne(() => UserEntity, (user) => user.userPassword)
  user: UserEntity;
}
