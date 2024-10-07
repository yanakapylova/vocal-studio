export class CreateGroupDto {
  name: string;
  songs: string[];
  users?: number[];
  schedules?: number[];
}
