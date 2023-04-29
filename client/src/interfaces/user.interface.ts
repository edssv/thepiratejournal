import type { UserRole } from '../lib/enums';

import type { Article } from './article.interface';

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  articles: Article[];
  likes: Article[];
  bookmarks: Article[];
  drafts: Partial<Article[]>;
  following: User[];
  followers: User[];
  followersCount: number;
}
