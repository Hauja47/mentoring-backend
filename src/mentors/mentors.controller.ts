import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('mentors')
@ApiTags('Mentors')
export class MentorsController {
  constructor(private readonly mentorService: MentorsService) {}

  @Post()
  async create(@Body() createMentorDto: CreateMentorDto) {
    return await this.mentorService.create(createMentorDto);
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const { page, limit } = paginationQuery;

    return await this.mentorService.findAll({ limit, page });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mentorService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMentorDto: UpdateMentorDto,
  ) {
    return await this.mentorService.update(id, updateMentorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.mentorService.remove(id);
  }
}
