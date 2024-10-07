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
    role: string;
    name: string;
    surname: string;
    fathername: string;
    birthdate: string;
    school: string;
    address: string;
    phone: string;
    groups: number[];
  }) => {
    const {
      name,
      surname,
      fathername,
      birthdate,
      phone,
      school,
      address,
      role,
      groups,
    } = user;
    const response = await fetch(`http://127.0.0.1:3008/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        fathername: fathername,
        birthdate: birthdate,
        phone: phone,
        school: school,
        address: address,
        password: birthdate.toString(),
        role: role,
        groups: groups,
      }),
    });

    if (!response.ok) {
      console.log("Не удалось создать пользователя");
      return { data: null, statusCode: response.status };
    }

    console.log(`Пользователь ${name} ${surname} успешно создан`);
    const data = await response.json();
    return { data: data, statusCode: response.status };
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
      return { id: null, statusCode: +response.status };
    }
    console.log(`Пользователь успешно удален`);
    return { id: id, statusCode: +response.status };
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
      return { data: null, statusCode: response.status };
    } else {
      console.log(`Инофрмация о пользователе успешно обновлена`);
      return { data: data, statusCode: response.status };
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
    const response = await fetch(`http://127.0.0.1:3008/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      console.log(`Не удалось обновить информация о пользователе`);
      return { data: null, statusCode: response.status };
    } else {
      console.log(`Инофрмация о пользователе успешно обновлена`);
      return { data: data, statusCode: response.status };
    }
  }
);

export const updateUserPhoto = createAsyncThunk(
  "user/updateUserPhoto",
  async (data: {
    id: number | undefined | null;
    newData: {
      photoURL: string | undefined | null;
    };
  }) => {
    const { id, newData } = data;

    const response = await fetch(`http://127.0.0.1:3008/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      console.log(`Не удалось обновить информация о пользователе`);
      return { data: null, statusCode: response.status };
    } else {
      console.log(`Инофрмация о пользователе успешно обновлена`);
      return { data: newData.photoURL, statusCode: response.status };
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

    return { data: data["userInfo"], statusCode: +response.status };
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
  fathername: string;
  birthdate: string;
  phone: string;
  school: string;
  address: string;
  role: string;
  groups: Group[];
  photoURL: string | null | undefined;
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
  extraReducers: (builder) => {
    // получить всех пользователей (только для админа)
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.entities = data;
      }
    });

    builder.addCase(fetchUserbyId.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          fathername: data.fathername,
          birthdate: data.birthdate,
          phone: data.phone,
          school: data.school,
          address: data.address,
          role: data.role,
          groups: data.groups,
          photoURL: data.photoURL,
        };
      }
    });

    // создать нового пользователя
    builder.addCase(createUser.fulfilled, (state, action) => {
      const { data, statusCode } = action.payload;

      if (data) {
        state.entities.push(data);
      }

      console.log(statusCode);
    });

    // удалить пользователя
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const { id, statusCode } = action.payload;

      if (id) {
        state.entities = state.entities.filter((entity) => entity.id !== id);
      }
      console.log(statusCode);
    });

    // вход в аккаунт
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { data, statusCode } = action.payload;

      if (data) {
        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          fathername: data.fathername,
          birthdate: data.birthdate,
          phone: data.phone,
          school: data.school,
          address: data.address,
          role: data.role,
          groups: data.groups,
          photoURL: data.photoURL,
        };
      }

      sessionStorage.setItem("user", JSON.stringify(data));
      console.log(statusCode);
    });

    // инф-ия об активном пользователе
    builder.addCase(setActiveUser.fulfilled, (state, action) => {
      const data = action.payload;

      if (data) {
        state.activeUser = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          fathername: data.fathername,
          birthdate: data.birthdate,
          phone: data.phone,
          school: data.school,
          address: data.address,
          role: data.role,
          groups: data.groups,
          photoURL: data.photoURL,
        };
      }
    });

    builder.addCase(updateUserPhoto.fulfilled, (state, action) => {
      const { data, statusCode } = action.payload;

      if (statusCode == 200 && state.activeUser) {
        state.activeUser.photoURL = data;
      }
    });
  },
});

export const usersReducer = usersSlice.reducer;
