import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Group } from "./interfaces/Group";
import { User } from "./interfaces/User";
import { Schedule } from "./interfaces/Schedule";

// получить пользователя по id
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://127.0.0.1:3008/users", {
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    console.log("Не удалось получить пользователей");
    return null;
  }

  return data;
});

export const fetchUserbyId = createAsyncThunk(
  "user/fetchUserbyId",
  async (id: number) => {
    const response = await fetch(`http://localhost:3008/users/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.log("Такого пользователя не существует");
      return null;
    }

    const data = await response.json();
    return data;
  }
);

// создать нового пользователя
export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: {
    name: string;
    surname: string;
    birthdate: string;
    email: string;
    role: string;
    groups: number[];
  }) => {
    const { name, surname, birthdate, email, role, groups } = user;
    const response = await fetch(`http://127.0.0.1:3008/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        birthdate: birthdate,
        email: email,
        password: birthdate.toString(),
        role: role,
        groups: groups,
      }),
    });

    if (!response.ok) {
      console.log("Не удалось создать пользователя");
      return null
    }

    console.log(`Пользователь ${name} ${surname} успешно создан`);
    const data = await response.json();
    return data
  }
);

// удалить пользователя
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: number) => {
    const response = await fetch(`http://127.0.0.1:3008/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Такого пользователя не существует");
      return null;
    }
    console.log(`Пользователь успешно удален`);
    return id;
  }
);

// обновление name
export const updateUserName = createAsyncThunk(
  "user/updateUserName",
  async (data: { id: number; newName?: string }) => {
    const { id, newName } = data;

    const response = await fetch(`http://127.0.0.1:3008/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
      }),
    });

    if (!response.ok) {
      console.log(`Не удалось обновить информация о пользователе`);
      return null;
    } else {
      console.log(`Инофрмация о пользователе успешно обновлена`);
      data;
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: {
    id: number;
    newData: {
      name?: string;
      surname?: string;
      birthdate?: string;
      email?: string;
      role?: string;
      groups?: Group[];
    };
  }) => {
    const { id, newData } = data;

    console.log(JSON.stringify(newData));
    const response = await fetch(`http://127.0.0.1:3008/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      console.log(`Не удалось обновить информация о пользователе`);
      return null
    } else {
      console.log(`Инофрмация о пользователе успешно обновлена`);
      return data;
    }
  }
);

// вход в аккаунт
export const signIn = createAsyncThunk(
  "user/signIn",
  async (credits: { email: string; password: string }) => {
    const { email, password } = credits;
    const response = await fetch(`http://127.0.0.1:3008/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      console.log("Пользователя с такими данными не существует");
      return { id: null, statusCode: +response.status };
    }

    const data = await response.json();
    localStorage.removeItem("jwtToken");
    localStorage.setItem("jwtToken", "Bearer " + data["access_token"]);
    console.log("Добро пожаловать!");

    return data["userInfo"];
  }
);

// инф-ия об активном пользователе
export const setActiveUser = createAsyncThunk(
  "user/setActiveUser",
  async () => {
    const user = sessionStorage.getItem("user");
    if (user) return await JSON.parse(user);
  }
);

export interface ActiveUser {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  email: string;
  role: string;
  groups: Group[];
  photoURL: string;
}

export interface UsersState {
  entities: User[];
  activeUser: ActiveUser | null;
  actionStatus: any;
  activeSchedule: Schedule[];
  groups: Group[];
}

const initialState: UsersState = {
  entities: [],
  activeUser: null,
  actionStatus: 0,
  activeSchedule: [],
  groups: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    // получить всех пользователей (только для админа)
    builder.addCase(fetchUsers.fulfilled, (state: any, action: any) => {
      const data = action.payload;
      if (data) {
        state.entities = data;
      }
    });

    builder.addCase(fetchUserbyId.fulfilled, (state: any, action: any) => {
      const data = action.payload;
      if (data) {
        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          birthdate: data.birthdate,
          email: data.email,
          role: data.role,
          groups: data.groups,
          photoURL: data.photoURL,
        };
      }
    });

    // создать нового пользователя
    builder.addCase(createUser.fulfilled, (state: any, action: any) => {
      const data = action.payload;

      if (data) {
        state.entities.push(data);
      }
    });

    // удалить пользователя
    builder.addCase(deleteUser.fulfilled, (state: any, action: any) => {
      const id = action.payload;

      if (id) {
        state.entities = state.entities.filter((entity: any) => entity.id !== id);
      }
    });

    // вход в аккаунт
    builder.addCase(signIn.fulfilled, (state: any, action: any) => {
      const data = action.payload;

      if (data) {
        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          birthdate: data.birthdate,
          email: data.email,
          role: data.role,
          photoURL: data.photoURL,
          groups: data.groups,
        };
      }

      sessionStorage.setItem("user", JSON.stringify(data));
    });

    // инф-ия об активном пользователе
    builder.addCase(setActiveUser.fulfilled, (state: any, action: any) => {
      const data = action.payload;

      if (data) {
        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          birthdate: data.birthdate,
          email: data.email,
          role: data.role,
          photoURL: data.photoURL,
          groups: data.groups,
        };
      }
    });
  },
});

export const usersReducer = usersSlice.reducer;
