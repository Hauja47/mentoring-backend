import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mentor } from './mentor.entity';

@Entity()
export default class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany((type) => Mentor, (mentor) => mentor.skills)
  mentors: Mentor[];
}
