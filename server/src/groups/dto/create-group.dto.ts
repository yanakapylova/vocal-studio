import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  users?: number[];

  @IsArray()
  @IsOptional()
  schedules?: number[];
}
