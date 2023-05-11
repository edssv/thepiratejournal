import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Block } from 'src/lib/block.type';

export class CreateArticleDto {
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

  @IsNotEmpty()
  @IsNumber()
  readingTime: number;
}
