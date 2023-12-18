import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { MentorsController } from './mentors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentor } from './entities/mentor.entity';
import { Skill } from '../skills/entities/skill.entity';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mentor, Skill]), SkillsModule],
  controllers: [MentorsController],
  providers: [MentorsService],
})
export class MentorsModule {}
