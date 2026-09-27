import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ 
    example: 'toto.wolff@mercedesamgf1.com', 
    description: 'Służbowy adres e-mail szefa stajni' 
  })
  @IsEmail({}, { message: 'Nieprawidłowy adres e-mail' })
  email!: string;

  @ApiProperty({ 
    example: 'SuperTajneHaslo123!', 
    description: 'Hasło dostępowe (min. 8 znaków)' 
  })
  @IsString()
  @MinLength(8, { message: 'Hasło musi mieć minimum 8 znaków' })
  password!: string;
}