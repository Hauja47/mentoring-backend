import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../skills/entities/skill.entity';
import { Mentor } from './entities/mentor.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class MentorsService {
  constructor(
    @InjectRepository(Mentor)
    private readonly mentorsRepository: Repository<Mentor>,
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
  ) {}

  async create(createMentorDto: CreateMentorDto) {
    const skills = await this.getSkillsByNames(createMentorDto.skills);

    const mentor = this.mentorsRepository.create({
      ...createMentorDto,
      skills,
    });
    return this.mentorsRepository.save(mentor);
  }

  async findAll(paginationOptions: IPaginationOptions) {
    return paginate<Mentor>(this.mentorsRepository, paginationOptions, {
      relations: ['skills'],
    });
  }

  async findOne(id: string) {
    const mentor = await this.mentorsRepository.findOne({
      relations: ['skills', 'courses'],
      where: {
        id: id,
      },
    });

    if (!mentor) {
      throw new NotFoundException(`Không tìm thấy mentor ${id}`);
    }

    return mentor;
  }

  async update(id: string, updateMentorDto: UpdateMentorDto) {
    const skills =
      updateMentorDto.skills &&
      (await this.getSkillsByNames(updateMentorDto.skills));

    const mentor = await this.mentorsRepository.preload({
      id: id,
      ...updateMentorDto,
      skills,
    });
    if (!mentor) {
      throw new NotFoundException(`Không tìm thấy mentor ${id}`);
    }
    return this.mentorsRepository.save(mentor);
  }

  async remove(id: string) {
    const mentor = await this.findOne(id);

    return this.mentorsRepository.softRemove(mentor);
  }

  private async getSkillsByNames(names: string[]): Promise<Skill[]> {
    const notExistsSkills: string[] = [];

    const skills = (await Promise.all(
      names.map(async (skill) => {
        const s = await this.skillsRepository.findOne({
          where: { id: skill },
        });

        if (s == null) {
          notExistsSkills.push(skill);
        }
        return s;
      }),
    )) as Skill[];

    if (notExistsSkills.length > 0) {
      throw new NotFoundException(
        `Kỹ năng không tồn tại: ${notExistsSkills.join(', ')}`,
      );
    }

    return skills;
  }
}
