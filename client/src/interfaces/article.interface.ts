import { Block } from './block.interface';
import { Comment } from './comments.interface';
import { User } from './user.interface';

export interface Article {
  id: number;
  title: string;
  searchTitle: string;
  description: string;
  cover: string;
  body: Block[];
  tags: string[];
  category: string;
  readingTime: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  viewsCount: number;
  likesCount: number;
  likesUsers: User[];
}
