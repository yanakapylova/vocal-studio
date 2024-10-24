import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Schedule } from "./interfaces/Schedule";
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

export const fetchSchedules = createAsyncThunk(
  "schedule/fetchSchedules",
  async () => {
    const response = await fetch(`http://localhost:3008/schedules`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
);

export const getSchedule = createAsyncThunk(
  "schedule/getSchedule",
  async (id: number) => {
    const response = await fetch(`http://localhost:3008/schedule/user/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const createSchedule = createAsyncThunk(
  "schedule/createSchedule",
  async (info: {
    type: string;
    date: string;
    time: string;
    place: string;
    durationMin: number;
    activity: string;
    groups: number[];
  }) => {
    const { type, date, time, place, durationMin, activity, groups } = info;
    console.log(groups);
    const response = await fetch(`http://localhost:3008/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        date,
        time,
        place,
        durationMin,
        activity,
        groups,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const deleteSchedule = createAsyncThunk(
  "schedule/deteteSchedule",
  async (id: number) => {
    await fetch(`http://localhost:3008/schedule/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

interface currentSchedule {
  id: number;
  type: string;
  date: string;
  time: string;
  place: string;
  durationMin: string;
  activity: string;
  groups: Group[];
}

export interface SchedulesState {
  entities: Schedule[];
  current: currentSchedule[];
}

const initialState: SchedulesState = {
  entities: [],
  current: [],
};

export const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchSchedules.fulfilled, (state: any, action: any) => {
      const data = action.payload;
      if (data) {
        state.entities = data;
      }
    });

    builder.addCase(getSchedule.fulfilled, (state: any, action: any) => {
      const data = action.payload;
      if (data) {
        state.current = data;
      }
    });

    builder.addCase(createSchedule.fulfilled, (state: any, action: any) => {
      const data = action.payload;
      if (data) {
        console.log(data);
        state.current.push(data);
      }
    });

    builder.addCase(deleteSchedule.fulfilled, (state: any, action: any) => {
      const id = action.payload;
      if (id) {
        state.current = state.current.filter((event: any) => event.id !== id);
      }

      console.log(id);
    });
  },
});

export const schedulesReducer = schedulesSlice.reducer;
