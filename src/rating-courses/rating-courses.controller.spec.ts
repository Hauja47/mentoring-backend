import { Test, TestingModule } from '@nestjs/testing';
import { RatingCoursesController } from './rating-courses.controller';
import { RatingCoursesService } from './rating-courses.service';

describe('RatingCoursesController', () => {
  let controller: RatingCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingCoursesController],
      providers: [RatingCoursesService],
    }).compile();

    controller = module.get<RatingCoursesController>(RatingCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
