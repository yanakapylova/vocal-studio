import { emptySchedule, mockSchedule, mockSchedule2, mockSchedule3 } from "./Schedule";

export const mockGroup = {
  id: 1,
  name: "Crystal",
  schedules: [mockSchedule, mockSchedule2, mockSchedule3],
};

export const emptyGroup = {
  id: 0,
  name: "",
  schedules: [emptySchedule],
};
