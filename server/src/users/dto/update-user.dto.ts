export class UpdateUserDto {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  role?: string;
  birthdate?: string;
  photoURL?: string;
  isActive?: boolean;
  groups?: number[];
}
