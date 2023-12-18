import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isExist = await this.categoriesRepository.exist({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (isExist) {
      throw new BadRequestException(
        `Category ${createCategoryDto.name} đã tồn tại!`,
      );
    }

    const skill = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(skill);
  }

  async findAll() {
    return this.categoriesRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Không tìm thấy category ${id}`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const isCategoryAlreadyExisted =
      updateCategoryDto.name &&
      (await this.categoriesRepository.findOne({
        where: {
          name: updateCategoryDto.name,
        },
      }));

    if (isCategoryAlreadyExisted) {
      throw new BadRequestException(
        `Category ${updateCategoryDto.name} đã tồn tại`,
      );
    }

    const category = await this.categoriesRepository.preload({
      id: id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Không tìm thấy category ${id}`);
    }
    return this.categoriesRepository.save(category);
  }
}
