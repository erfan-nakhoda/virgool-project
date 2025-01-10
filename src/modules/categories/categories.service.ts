import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ConflictMessages, NotFoundMessages, PublicMessage } from 'src/common/enums/message.enum';
import { PaginationDto } from './dto/pagination.dto';
import { paginationGenerator, PaginationStructureSolver } from 'src/common/utils/pagination.util';
import omitEmpty = require("omit-empty");
@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private categoryRepository : Repository<CategoryEntity>){}
  async create(createCategoryDto: CreateCategoryDto) {
    const {title , priority} = createCategoryDto;
    await this.CheckConflictTitle(title);
    const category = this.categoryRepository.create({
      title,
      priority
    })
    await this.categoryRepository.save(category);
    return {
      message : PublicMessage.CategoryCreated
    }
  }
  async CheckConflictTitle(title : string) {
    const ValidTitle = title?.trim().toLowerCase();
    const category = await this.categoryRepository.findOneBy({title : ValidTitle});
    if(category) throw new ConflictException(ConflictMessages.TitleCategory);
    return ValidTitle
  }

  async findAll(paginationDto : PaginationDto) {
    let {skip, page, limit} = PaginationStructureSolver(paginationDto);
    const [categories, count] = await this.categoryRepository.findAndCount({
      where : {},
      take : limit,
      skip : skip,
    })
    return {
      pagination : paginationGenerator(count, limit, page),
      categories
    }
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({id});
    if(!category) throw new NotFoundException(NotFoundMessages.CategoryMissing);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    const data = omitEmpty(updateCategoryDto);
    await this.categoryRepository.update({id}, data);
    return {
      message : PublicMessage.CategoryUpdated
    }

  }

  async remove(id: number) {
    await this.findOne(id);
    await this.categoryRepository.delete({id});
    return {
      message : PublicMessage.CategoryDeleted
    }
  }
}
