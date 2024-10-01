import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Связь "многие ко многим" с пользователями
  @ManyToMany(() => User, (user) => user.groups)
  users: User[];

  // Связь "многие ко многим" с расписаниями
  @ManyToMany(() => Schedule, (schedule) => schedule.groups)
  @JoinTable() // Промежуточная таблица для связи с расписаниями
  schedules: Schedule[];
}
