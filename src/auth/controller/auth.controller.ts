import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginRequest, SignUpRequest } from '../model/auth.request';
import { validateSync, ValidationError } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginRequest) {
    const errors = validateSync(dto);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid input data');
    }
    const user = await this.authService.validateUser(
      dto.username,
      dto.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpRequest) {
    const errors: ValidationError[] = validateSync(dto);
    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints || {}).join(', '))
        .join('; ');
      throw new BadRequestException(messages);
    }
    const result = await this.authService.signUp(dto);
    return result;
  }
}
