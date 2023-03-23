enum ArticleViewsCountEnum {
    DESC = 'DESC',
    ASC = 'ASC',
}

export class SearchArticleDto {
    title?: string;
    body?: string;
    viewsCount?: ArticleViewsCountEnum;
    tag?: string;
}
