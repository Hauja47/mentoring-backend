import { Injectable } from '@nestjs/common';
import { CreateRatingCourseDto } from './dto/create-rating-course.dto';
import { UpdateRatingCourseDto } from './dto/update-rating-course.dto';

@Injectable()
export class RatingCoursesService {
  create(createRatingCourseDto: CreateRatingCourseDto) {
    return 'This action adds a new ratingCourse';
  }

  findAll() {
    return `This action returns all ratingCourses`;
  }

  findOne(id: string) {
    return `This action returns a #${id} ratingCourse`;
  }

  update(id: string, updateRatingCourseDto: UpdateRatingCourseDto) {
    return `This action updates a #${id} ratingCourse`;
  }

  remove(id: string) {
    return `This action removes a #${id} ratingCourse`;
  }
}
