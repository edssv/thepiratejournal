import { Article as IArticle, User } from '../lib/interfaces';
import BlogArticle from '../models/blog.model';

export default class ArticleBlogService {
    public createArticle = async function (authorId: string, authorUsername: string, articleData: IArticle) {
        const article = await BlogArticle.create({
            title: articleData.title,
            description: articleData.description,
            searchTitle: articleData.title.toLowerCase(),
            cover: articleData.cover,
            blocks: articleData.blocks,
            tags: articleData.tags,
            category: articleData.category,
            readingTime: articleData.readingTime,
            author: { _id: authorId, username: authorUsername },
            isPublished: true,
        });

        return article;
    };

    public editArticle = async function (
        articleId: string,
        title: string,
        description: string,
        cover: string,
        blocks: [],
        tags: [],
        category: {},
        readingTime: number
    ) {
        if (!title || !cover || !blocks) {
            throw Error('Заголовок обложка и блоки обязательны.');
        }

        const article = await BlogArticle.updateOne(
            { _id: articleId },
            {
                title: title,
                description: description,
                searchTitle: title.toLowerCase(),
                cover: cover,
                blocks: blocks,
                tags: tags,
                category: category,
                readingTime: readingTime,
                updatedAt: new Date(),
            }
        );

        return article;
    };

    public saveChanges = async function (authorId: string, authorUsername: string, articleData: IArticle) {
        const article = await BlogArticle.findById(articleData._id);

        if (article) {
            const article = await BlogArticle.updateOne(
                { _id: articleData._id },
                {
                    title: articleData.title,
                    description: articleData.description,
                    searchTitle: articleData.title.toLowerCase(),
                    cover: articleData.cover,
                    blocks: articleData.blocks,
                    tags: articleData.tags,
                    category: articleData.category,
                    readingTime: articleData.readingTime,
                    author: { _id: authorId, username: authorUsername },
                }
            );

            return article;
        }

        if (!article) {
            const article = await BlogArticle.create({
                title: articleData.title,
                description: articleData.description,
                searchTitle: articleData.title.toLowerCase(),
                cover: articleData.cover,
                blocks: articleData.blocks,
                tags: articleData.tags,
                category: articleData.category,
                readingTime: articleData.readingTime,
                author: { _id: authorId, username: authorUsername },
            });

            return article;
        }

        return article;
    };

    public getAllArticles = async function (section: string, currentUser: User) {
        if (section === 'following') {
            const followList = currentUser.follow;
            const articles = await BlogArticle.find({
                $and: [{ 'author._id': { $in: followList } }, { isPublished: true }],
            });

            return articles;
        }

        if (section === 'for_you') {
            const articles = await BlogArticle.find({ isPublished: true }).exec();

            return articles;
        }

        if (section === 'blog') {
            const articles = await BlogArticle.find();
        }
    };

    public getOneArticle = async function (id: string) {
        const article = await BlogArticle.findOneAndUpdate(
            { _id: id, isPublished: true },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        );

        if (!article) return;

        return article;
    };
}
