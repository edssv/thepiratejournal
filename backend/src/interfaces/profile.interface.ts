export interface Profile {
    id: string;
    email: string;
    name: string;
    picture: string;
    password: string;
    emailVerified: boolean;
    follow: { userId: string }[];
    followers: { userId: string }[];
    liked: { articleId: string }[];
    appreciated: { articleId: string }[];
    bookmarks: { articleId: string }[];
}
