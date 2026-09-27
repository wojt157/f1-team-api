import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 'SF-24', description: 'Oznaczenie kodowe modelu bolidu' })
  @IsString()
  @IsNotEmpty()
  chassisName!: string;

  @ApiProperty({ example: 'Charles Leclerc', description: 'Imię i nazwisko kierowcy' })
  @IsString()
  @IsNotEmpty()
  driverName!: string;

  @ApiProperty({ example: 16, description: 'Numer startowy bolidu' })
  @IsNumber()
  number!: number;

  @ApiProperty({ example: 1, description: 'ID przypisanego zespołu' })
  @IsNumber()
  teamId!: number;
}
