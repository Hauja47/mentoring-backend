import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../common/entities/base-model.entity';
import { Mentor } from '../../mentors/entities/mentor.entity';

@Entity()
export class Course extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 0,
  })
  price: number;

  @Column({
    default: 0,
  })
  rating: number;

  @Column()
  image: string;

  @Column()
  mentorId: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.courses)
  mentor: Mentor;
}
