import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from '../../common/entities/base-model.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Mentor extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', array: true, nullable: true })
  certificates: string[];

  @Column({
    nullable: true,
  })
  description: string;

  @JoinTable()
  @ManyToMany(() => Skill, (skill) => skill.mentors)
  skills: Skill[];

  @OneToMany(() => Course, (course) => course.mentor)
  courses: Course[];
}
