import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  type: string;

  @IsDate()
  date: string;

  @IsString()
  time: string;

  @IsString()
  place: string;

  @IsNumber()
  durationMin: number;

  @IsString()
  activity: string;

  @IsArray()
  groups: number[];
}
