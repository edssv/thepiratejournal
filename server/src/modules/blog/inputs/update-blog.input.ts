import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogInput } from './create-blog.input';

export class UpdateBlogDto extends PartialType(CreateBlogInput) {}
