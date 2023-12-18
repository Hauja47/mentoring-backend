import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingCoursesService } from './rating-courses.service';
import { CreateRatingCourseDto } from './dto/create-rating-course.dto';
import { UpdateRatingCourseDto } from './dto/update-rating-course.dto';

@Controller('rating-courses')
export class RatingCoursesController {
  constructor(private readonly ratingCoursesService: RatingCoursesService) {}

  @Post()
  create(@Body() createRatingCourseDto: CreateRatingCourseDto) {
    return this.ratingCoursesService.create(createRatingCourseDto);
  }

  @Get()
  findAll() {
    return this.ratingCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingCoursesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRatingCourseDto: UpdateRatingCourseDto,
  ) {
    return this.ratingCoursesService.update(id, updateRatingCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingCoursesService.remove(id);
  }
}
