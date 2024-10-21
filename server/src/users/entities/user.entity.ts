import { Group } from 'src/groups/entities/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  photoURL: string;

  // TODO: remove russian commets
  // Связь "многие ко многим" с группами
  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable() // Промежуточная таблица для связи "многие ко многим"
  groups: Group[];
}
