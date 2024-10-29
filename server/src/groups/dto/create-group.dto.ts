import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Crystal' })
  @IsString()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, example: [1, 2] })
  @IsArray()
  users?: number[];

  @IsNotEmpty()
  @ApiProperty({ type: String, example: [1, 2] })
  @IsArray()
  schedules?: number[];
}
