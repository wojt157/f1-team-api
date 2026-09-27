import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Podano niepoprawny adres email' })
  email!: string;

  @IsString()
  password!: string;
}