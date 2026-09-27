import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Scuderia Ferrari', description: 'Oficjalna nazwa zespołu' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Nazwa zespołu nie może przekraczać 50 znaków.' })
  name!: string;

  @ApiProperty({ example: 140000000, description: 'Budżet operacyjny w dolarach (Cost Cap)' })
  @IsNumber()
  @Min(0, { message: 'Budżet zespołu nie może być ujemny!' })
  budget!: number;

  @ApiPropertyOptional({ example: 1929, description: 'Rok założenia zespołu (opcjonalnie)' })
  @IsNumber()
  @IsOptional()
  foundedYear?: number;
}