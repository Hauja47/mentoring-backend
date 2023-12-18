import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
  ) {}

  async findAll() {
    return this.skillsRepository.find();
  }

  async create(createSkillDto: CreateSkillDto) {
    const isExist = await this.skillsRepository.exist({
      where: {
        name: createSkillDto.name,
      },
    });

    if (isExist) {
      throw new BadRequestException(
        `Kỹ năng ${createSkillDto.name} đã tồn tại!`,
      );
    }

    const skill = this.skillsRepository.create(createSkillDto);
    return this.skillsRepository.save(skill);
  }

  async findOne(id: string) {
    const skill = await this.skillsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!skill) {
      throw new NotFoundException(`Không tìm thấy kỹ năng ${id}`);
    }

    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const isSkillAlreadyExisted =
      updateSkillDto.name &&
      (await this.skillsRepository.findOne({
        where: {
          name: updateSkillDto.name,
        },
      }));

    if (isSkillAlreadyExisted) {
      throw new BadRequestException(
        `Kỹ năng ${updateSkillDto.name} đã tồn tại`,
      );
    }

    const skill = await this.skillsRepository.preload({
      id: id,
      ...updateSkillDto,
    });

    if (!skill) {
      throw new NotFoundException(`Không tìm thấy kỹ năng ${id}`);
    }
    return this.skillsRepository.save(skill);
  }
}
