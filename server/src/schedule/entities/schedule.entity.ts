import { Group } from 'src/groups/entities/group.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column()
  place: string;

  @Column()
  durationMin: number;

  @Column()
  activity: string;

  // Связь "многие ко многим" с группами
  @ManyToMany(() => Group, (group) => group.schedules)
  groups: Group[];
}
