import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/database/default/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserCreate } from '../interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const userPassword = user.userPassword.password;

    if (user && (await bcrypt.compare(password, userPassword))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }

  async signUp(payload: UserCreate) {
    const user = await this.usersService.createUser(payload);
    return { message: 'User registered successfully', user };
  }
}
