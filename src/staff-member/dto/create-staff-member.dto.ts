import { IsString, IsNumber, IsEnum, IsOptional, IsNotEmpty, MaxLength, Min } from 'class-validator';
import { StaffRole } from '@prisma/client';

export class CreateStaffMemberDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName!: string;

  @IsEnum(StaffRole)
  role!: StaffRole;

  @IsNumber()
  @Min(0)
  salary!: number;

  @IsNumber()
  teamId!: number;

  @IsNumber()
  @IsOptional()
  carId?: number;
}
