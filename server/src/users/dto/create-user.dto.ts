import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// export class CreateUserDto {
//
//   @IsString()
//   name: string;

//
//   @IsString()
//   surname: string;

//
//   @IsEmail()
//   email: string;

//
//   @MinLength(6)
//   password: string;

//
//   @IsString()
//   role: string;

//
//   birthdate: string; // или Date, если используете конкретный формат даты

//   photoURL?: string; // необязательное поле

//   groups?: number[]; // массив идентификаторов групп
// }

export class CreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  birthdate: string;
  photoURL?: string;
  isActive: boolean;
  groups?: number[];
}
