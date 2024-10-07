import { Group } from "./Group";

export interface User {
  id: number;
  role: string;
  name: string;
  surname: string;
  fathername: string;
  birthdate: string;
  school: string;
  address: string;
  phone: string;
  photoURL: string;
  groups: Group[];
}
