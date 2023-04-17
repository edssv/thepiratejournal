import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BlogCategory } from '../entities/blog.entity';
import { Block } from 'src/lib/block.type';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  cover: string;

  @IsNotEmpty()
  @IsArray()
  body: Block[];

  @IsOptional()
  @IsArray()
  tags?: string;

  @IsOptional()
  @IsEnum(BlogCategory)
  category?: BlogCategory;

  @IsNotEmpty()
  @IsNumber()
  readingTime: number;
}
