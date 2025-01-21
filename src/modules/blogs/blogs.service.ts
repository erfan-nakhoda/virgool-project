import { Body, Inject, Injectable, Scope } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { randomId, Slugify } from 'src/common/utils/functions.utils';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { FilterBlogDto } from './dto/filter-blog.dto';
import { PaginationDto } from '../categories/dto/pagination.dto';
import { paginationGenerator, PaginationStructureSolver } from 'src/common/utils/pagination.util';

@Injectable({ scope: Scope.REQUEST })
export class BlogsService {
  constructor(@InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>,
    @Inject(REQUEST) private request: Request
  ) { }
  async create(@Body() BlogDto: CreateBlogDto) {
    let { slug, title, content, description, image, time_for_study } = BlogDto;
    let {id} = this.request.user;
    let slugData = slug ?? title;
    BlogDto.slug = Slugify(slugData);
    if(await this.checkBlogBySlug(slug)) {
      slug += `-${randomId()}`
    }
    const blog =  this.blogRepository.create({
      title,
      slug,
      content,
      description,
      image,
      time_for_study,
    })
    await this.blogRepository.save(blog);

  }
  async myBlogs() {
    const {id} = this.request.user;
    return await this.blogRepository.find({
      where : {authorId : id},
      order : {
        id : "DESC"
      }
    });

  }

  async getBlogs(paginationDto : PaginationDto) {
    const {page,skip,limit} = PaginationStructureSolver(paginationDto);
    const [blogs, count] = await this.blogRepository.findAndCount({
      where : {},
      order : {
        id : "DESC"
      },
      skip,
      take : limit
    })

    return {
      pagination : paginationGenerator(count, limit, page),
      blogs
    }
  }
  findAll() {
    return `This action returns all blogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }

  async checkBlogBySlug(slug : string) {
    const blog = await this.blogRepository.findOneBy({slug});
    return !!blog;
  }
}
