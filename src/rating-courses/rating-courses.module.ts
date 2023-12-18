import { Module } from '@nestjs/common';
import { RatingCoursesService } from './rating-courses.service';
import { RatingCoursesController } from './rating-courses.controller';

@Module({
  controllers: [RatingCoursesController],
  providers: [RatingCoursesService],
})
export class RatingCoursesModule {}
