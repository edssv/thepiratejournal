import { PartialType } from '@nestjs/mapped-types';
import { CreateFollowerDto } from './create-follower.dto';

export class UpdateFollowerDto extends PartialType(CreateFollowerDto) {}
