import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MentorModule } from './mentor/mentor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [ormConfig],
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow('ormConfig'),
    }),
    MentorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
