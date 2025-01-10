import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports : [UserModule, AuthModule, TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
