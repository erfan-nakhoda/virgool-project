import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { SwaggerConsume } from 'src/common/enums/swagger-consumes.enum';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { PaginationDto } from '../categories/dto/pagination.dto';

@Controller('blogs')
@ApiTags("Blogs")
@ApiBearerAuth("Authorization")
@UseGuards(AuthGuard)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  @Post("create")
  @ApiConsumes(SwaggerConsume.Json,SwaggerConsume.UrlEncoded)
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }
  @Get('my')
  myBlogs(){
    return this.blogsService.myBlogs()
  }

  @Get('get')
  @SkipAuth()
  @Pagination()
  getBlogs(@Query() paginationDto : PaginationDto) {
    return this.blogsService.getBlogs(paginationDto)
  }


  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
