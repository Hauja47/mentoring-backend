import { Test, TestingModule } from '@nestjs/testing';
import { RatingCoursesService } from './rating-courses.service';

describe('RatingCoursesService', () => {
  let service: RatingCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingCoursesService],
    }).compile();

    service = module.get<RatingCoursesService>(RatingCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
