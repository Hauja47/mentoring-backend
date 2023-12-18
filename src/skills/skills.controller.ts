import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skills')
@ApiTags('Skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAll() {
    return await this.skillsService.findAll();
  }

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    return await this.skillsService.create(createSkillDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(id, updateSkillDto);
  }
}
