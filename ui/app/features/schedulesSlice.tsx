import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Schedule } from "./interfaces/Schedule";
import { Group } from "./interfaces/Group";

// получить всех пользователей (только для админа)

export const fetchSchedules = createAsyncThunk(
  "schedule/fetchSchedules",
  async () => {
    const response = await fetch(`http://localhost:3008/schedules`, {
      method: "GET",
    });
    const data = await response.json();
    return [data, response.status];
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
    return [data, response.status];
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
    return [data, response.status];
  }
);

export const deleteSchedule = createAsyncThunk(
  "schedule/deteteSchedule",
  async (id: number) => {
    const response = await fetch(`http://localhost:3008/schedule/${id}`, {
      method: "DELETE",
    });
    console.log(id);
    return [id, response.status];
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
  extraReducers: (builder) => {
    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      const [data, responseStatus] = action.payload;
      if (data) {
        state.entities = data;
      }
      console.log(responseStatus);
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      const [data, responseStatus] = action.payload;
      if (data) {
        state.current = data;
      }
      console.log(responseStatus);
    });

    builder.addCase(createSchedule.fulfilled, (state, action) => {
      const [data, responseStatus] = action.payload;
      if (data) {
        console.log(data);
        state.current.push(data);
      }
      console.log(responseStatus);
    });

    builder.addCase(deleteSchedule.fulfilled, (state, action) => {
      const [id, responseStatus] = action.payload;
      if (id) {
        state.current = state.current.filter((event) => event.id !== id);
      }

      console.log(id, responseStatus);
    });
  },
});

export const schedulesReducer = schedulesSlice.reducer;
