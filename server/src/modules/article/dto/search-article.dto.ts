enum ArticleSortEnum {
  RECENT = 'recent',
  ASC = 'ASC',
}

export class SearchArticleDto {
  search?: string;
  body?: string;
  sort?: 'recent' | 'appreciations' | 'views' | '' | undefined;
  tag?: string;
  limit?: number = 1;
  page?: number = 10;
}
