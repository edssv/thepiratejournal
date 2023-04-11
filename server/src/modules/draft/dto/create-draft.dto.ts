import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Column } from 'typeorm';

import { CreateArticleDto } from 'src/modules/article/dto/create-article.dto';

export class CreateDraftDto extends PartialType(OmitType(CreateArticleDto, ['title'])) {
  @Column()
  title: string;
}
