import { IsString, IsNumber } from 'class-validator';

export class RutinaDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  duration: number;
  @IsString()
  personalTrainer: string;
}
