import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  chassisName!: string;

  @IsString()
  @IsNotEmpty()
  driverName!: string;

  @IsNumber()
  number!: number;

  @IsNumber()
  teamId!: number;
}
