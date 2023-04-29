import type { Block } from './block.interface';
import type { User } from './user.interface';

export interface Blog {
  id: number;
  title: string;
  description: string;
  cover: string;
  body: Block[];
  tags: string[];
  category: string;
  readingTime: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  viewsCount: number;
  likesCount: number;
}
