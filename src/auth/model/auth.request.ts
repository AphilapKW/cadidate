import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequest {
  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  public password: string;
}

export class SignUpRequest extends LoginRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;
}
