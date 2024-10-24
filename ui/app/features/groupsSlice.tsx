import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Group } from "./interfaces/Group";

// получение id сессии (задается после login)
// function getSessionID() {
//   const cookieArray = document.cookie.split(";");
//   const sessionIDItem = cookieArray.find(
//     (cookieItem) => cookieItem.split("=")[0] === "session_id"
//   );
//   return sessionIDItem ? sessionIDItem.split("=")[1] : undefined;
// }

// получить всех пользователей (только для админа)

export const fetchGroups = createAsyncThunk("group/fetchGroups", async () => {
  const response = await fetch(`http://localhost:3008/groups`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
});

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (name: string) => {
    console.log(name);
    const response = await fetch(`http://localhost:3008/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export interface ActiveGroup {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  email: string;
  role: string;
  groups: Group[];
  photoURL: string;
}

export interface GroupsState {
  entities: Group[];
}

const initialState: GroupsState = {
  entities: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchGroups.fulfilled, (state: any, action: any) => {
      const data = action.payload;
      if (data) {
        state.entities = data;
      }
    });

    builder.addCase(createGroup.fulfilled, (state: any, action: any) => {
      const data = action.payload;
      if (data) {
        state.entities.push(data);
      }
    });
  },
});

export const groupsReducer = groupsSlice.reducer;
