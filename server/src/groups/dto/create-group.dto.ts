import { IsArray, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  users?: number[];

  @IsArray()
  schedules?: number[];
}
