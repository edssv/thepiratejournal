export enum ArticleCategory {
  REVIEWS = 'Обзоры',
  MENTIONS = 'Отзывы',
  SOLUTIONS = 'Прохождения',
}

export enum ArticlePageMode {
  ARTICLE = 'article',
  BLOG = 'blog',
}

export enum ArticleType {
  ARTICLE = 'Статья',
  BLOG = 'Блог',
}

export enum AuthPage {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export enum EditorPageMode {
  NEW = 'new',
  EDIT = 'edit',
  DRAFT = 'draft',
}

export enum EditorFormStatus {
  UNCHANGED = 'unchanged',
  MODIFIED = 'modified',
  SAVED = 'saved',
}

export enum ProfileSection {
  Articles = 'articles',
  Likes = 'likes',
  Bookmarks = 'bookmarks',
  Drafts = 'drafts',
}

export enum Tokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export enum UserRole {
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin',
}
