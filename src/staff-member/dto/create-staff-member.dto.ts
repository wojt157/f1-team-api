import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, IsNotEmpty, MaxLength, Min } from 'class-validator';
import { StaffRole } from '@prisma/client';

export class CreateStaffMemberDto {
  @ApiProperty({ example: 'Jan', description: 'Imię pracownika' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName!: string;

  @ApiProperty({ example: 'Kowalski', description: 'Nazwisko pracownika' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName!: string;

  @ApiProperty({ enum: StaffRole, example: StaffRole.MECHANIC, description: 'Rola w zespole' })
  @IsEnum(StaffRole)
  role!: StaffRole;

  @ApiProperty({ example: 100000, description: 'Roczny kontrakt w dolarach' })
  @IsNumber()
  @Min(0)
  salary!: number;

  @ApiProperty({ example: 1, description: 'ID przypisanego zespołu' })
  @IsNumber()
  teamId!: number;

  @ApiPropertyOptional({ example: 2, description: 'ID przypisanego bolidu (opcjonalnie)' })
  @IsNumber()
  @IsOptional()
  carId?: number;
}
