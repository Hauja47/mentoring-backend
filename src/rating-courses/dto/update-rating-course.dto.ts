import { PartialType } from '@nestjs/swagger';
import { CreateRatingCourseDto } from './create-rating-course.dto';

export class UpdateRatingCourseDto extends PartialType(CreateRatingCourseDto) {}
