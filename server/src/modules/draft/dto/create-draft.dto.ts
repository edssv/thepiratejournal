import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from 'src/modules/article/dto/create-article.dto';

export class CreateDraftDto extends PartialType(CreateArticleDto) {}
