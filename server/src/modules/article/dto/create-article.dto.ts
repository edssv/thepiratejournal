import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ArticleCategory, Block } from '../entities/article.entity';

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    searchTitle: string;

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

    @IsNotEmpty()
    @IsEnum(ArticleCategory)
    category: ArticleCategory;

    @IsNotEmpty()
    @IsNumber()
    readingTime: number;
}
