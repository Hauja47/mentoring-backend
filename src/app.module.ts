import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MentorsModule } from './mentors/mentors.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsModule } from './skills/skills.module';
import { CategoriesModule } from './categories/categories.module';
import { CoursesModule } from './courses/courses.module';
import { RatingCoursesModule } from './rating-courses/rating-courses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        url: process.env.DATABASE_URL,
        type: 'postgres',
        autoLoadEntities: true,
      }),
    }),
    MentorsModule,
    SkillsModule,
    CategoriesModule,
    CoursesModule,
    RatingCoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
