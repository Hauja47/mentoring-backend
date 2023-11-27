import { BaseEntity } from 'src/common/entities/base.entity/base.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Skill from './skill.enity';

@Entity()
export class Mentor extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  certificates: string[];

  @ManyToMany((type) => Skill, (skill) => skill.mentors)
  skills: Skill[];
}
