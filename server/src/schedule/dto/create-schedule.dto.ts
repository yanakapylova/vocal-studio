export class CreateScheduleDto {
  type: string;
  date: string;
  time: string;
  place: string;
  durationMin: number;
  activity: string;
  // Why it optional?
  groups?: number[];
}
