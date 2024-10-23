import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UpdatePasswordDto {
  @Type(() => Number)
  @IsInt()
  id: number;

  @IsString()
  password: string;
}
