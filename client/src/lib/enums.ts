export enum ArticleCategory {
    REVIEWS = 'reviews',
    MENTIONS = 'mentions',
    SOLUTIONS = 'solutions',
}

export enum ArticlePageMode {
    ARTICLE = 'article',
    BLOG = 'blog',
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
