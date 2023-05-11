import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-Article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
