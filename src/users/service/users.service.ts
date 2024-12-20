import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/database/default/entity/user.entity';
import { UserCreate } from '../interface/user.interface';
import { UserPasswordEntity } from 'src/database/default/entity/user-password.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserPasswordEntity)
    private usersPasswordRepository: Repository<UserPasswordEntity>,
  ) {}

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne({
      where: { username },
      relations: { userPassword: true },
    });
  }

  async findOneById(id: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async createUser(data: UserCreate): Promise<UserEntity> {
    const { email, username, password } = data;
    const existingUser = await this.findOneByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userPassword = this.usersPasswordRepository.create({
      password: hashedPassword,
    });

    const savedUserPassword =
      await this.usersPasswordRepository.save(userPassword);
    const user = this.usersRepository.create({
      email,
      username,
      userPassword: savedUserPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }
}
