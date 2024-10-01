import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./features/usersSlice";
import { groupsReducer } from "./features/groupsSlice";
import { schedulesReducer } from "./features/schedulesSlice";
// import { singleUserReducer } from "./features/singleUserSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    groups: groupsReducer,
    schedule: schedulesReducer,
    // singleUser: singleUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
