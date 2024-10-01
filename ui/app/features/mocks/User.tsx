import { emptyGroup, mockGroup } from "./Group";

export const emptyUser = {
  id: 0,
  name: "",
  surname: "",
  birthdate: "",
  email: "",
  password: "",
  role: "",
  groups: [emptyGroup],
  photoURL: "",
};

export const mockUser = {
  id: 1,
  name: "Yana",
  surname: "K",
  birthdate: "26.10.1999",
  email: "y.kapylova@gmail.com",
  password: "qwerty",
  role: "student",
  groups: [mockGroup],
  photoURL: "",
};
