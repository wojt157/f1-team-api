import { IsString, IsNumber, IsOptional, Min, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Nazwa zespołu nie może przekraczać 50 znaków.' })
  name!: string;

  @IsNumber()
  @Min(0, { message: 'Budżet zespołu nie może być ujemny!' })
  budget!: number;

  @IsNumber()
  @IsOptional()
  foundedYear?: number;
}