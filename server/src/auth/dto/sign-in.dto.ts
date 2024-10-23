import { IsString } from 'class-validator';

export class SignInUserDto {
  @IsString()
  login: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
