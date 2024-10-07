export class CreateUserDto {
  phone: string;
  password: string;
  name: string;
  surname: string;
  fathername: string;
  birthdate: string;
  school: string;
  address: string;
  role: string;
  groups?: number[];
}
