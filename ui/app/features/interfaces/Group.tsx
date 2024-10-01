import { Schedule } from "./Schedule";

export interface Group {
  id: number,
  name: string;
  schedules: Schedule[];
}
