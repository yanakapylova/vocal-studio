import { Group } from "./Group";

export interface User {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  email: string;
  password: string;
  role: string;
  photoURL: string;
  groups: Group[];
}
