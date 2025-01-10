import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsume } from 'src/common/enums/swagger-consumes.enum';
import { PaginationDto } from './dto/pagination.dto';
import { Pagination } from 'src/common/decorators/pagination.decorator';

@Controller('categories')
@ApiTags("Category")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post("create")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Pagination()
  findAll(@Query() paginationDto : PaginationDto) {
    return this.categoriesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }
  @Patch(':id')
  @ApiConsumes(SwaggerConsume.Json, SwaggerConsume.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiConsumes(SwaggerConsume.Json, SwaggerConsume.UrlEncoded)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
