import { ObjectId } from 'mongodb';
import { Article, Article as IArticle, User } from '../lib/interfaces';
import ArticleModel from '../models/article.model';

export default class ArticleService {
    public createArticle = async function (authorId: string, authorUsername: string, articleData: IArticle) {
        const article = await ArticleModel.create({
            title: articleData.title,
            description: articleData.description,
            searchTitle: articleData.title.toLowerCase(),
            cover: articleData.cover,
            blocks: articleData.blocks,
            tags: articleData.tags,
            category: articleData.category,
            readingTime: articleData.readingTime,
            author: { _id: authorId, username: authorUsername },
            isPublished: false,
        });

        return article;
    };

    public editArticle = async function (articleId: string, articleData: Article) {
        if (!articleData.title || !articleData.cover || !articleData.blocks) {
            throw Error('Заголовок, обложка и блоки обязательны.');
        }

        const article = await ArticleModel.updateOne(
            { _id: articleId },
            {
                title: articleData.title,
                description: articleData.description,
                searchTitle: articleData.title.toLowerCase(),
                cover: articleData.cover,
                blocks: articleData.blocks,
                tags: articleData.tags,
                category: articleData.category,
                readingTime: articleData.readingTime,
                updatedAt: new Date(),
            }
        );

        return article;
    };

    public getAllArticles = async function (section: string, currentUser: User) {
        if (section === 'following') {
            const followList = currentUser.follow;
            const articles = await ArticleModel.find({
                $and: [{ 'author._id': { $in: followList } }, { isPublished: true }],
            });

            return articles;
        }

        if (section === 'for_you') {
            const articles = await ArticleModel.find({ isPublished: true });

            return articles;
        }
    };

    public searchArticles = async function (categoryName: string, query: any) {
        const categoryParams = {
            'category.key': categoryName && categoryName !== 'all' ? categoryName : { $type: 'string' },
        };

        const searchParams = {
            searchTitle: { $regex: query.search ? query.search.toLowerCase() : '' },
        };

        const findParams = {
            $and: [categoryParams, searchParams, query.tag ? { tags: query.tag } : {}, { isPublished: true }],
        };

        const createdAt: Record<string, 1 | -1 | { $meta: 'textScore' }> = { createdAt: -1 };
        const likesCount: Record<string, 1 | -1 | { $meta: 'textScore' }> = { likesCount: -1 };
        const viewsCount: Record<string, 1 | -1 | { $meta: 'textScore' }> = { viewsCount: -1 };

        const sortParams = () => {
            if (query.sort === 'recent') {
                return createdAt;
            }
            if (query.sort === 'appreciations') {
                return likesCount;
            }
            return viewsCount;
        };

        if (!sortParams) return;
        const articles = await ArticleModel.find(findParams).sort(sortParams());

        return articles;
    };

    public getOneArticle = async function (id: string) {
        const article = await ArticleModel.findOneAndUpdate(
            { _id: id, isPublished: true },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        );

        if (!article) return;

        return Object.assign(article, { comments: { totalCount: article.comments.length } });
    };

    public getCommentsArticle = async function (articleId: string, query: any) {
        const article = await ArticleModel.findOne({ _id: articleId }, { comments: 1, _id: 0 });
        const totalCount = article?.comments.length ?? 0;

        const skip = query.page * query.limit;
        // const comments = article.comments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        const limitComments = article?.comments.slice(skip, Number(skip) + Number(query.limit));

        return { limitComments, totalCount };
    };

    public getSuggestionsArticles = async function (articleId: string, categoryName: string, query: any) {
        const findParams = {
            $and: [{ isPublished: true }],
        };

        const articles = await ArticleModel.find(findParams);
        const filterArticles = articles.filter((item: any) => item._id.toString() !== articleId);
        const totalCount = filterArticles.length;

        const skip = query.page * query.limit;

        const limitArticles = filterArticles.slice(skip, Number(skip) + Number(query.limit));

        return { limitArticles, totalCount };
    };

    public likeArticle = async function (id: string, userId: string) {
        const article = await ArticleModel.findOneAndUpdate(
            { _id: id },
            { $push: { likesUsers: userId }, $inc: { likesCount: 1 } },
            { returnDocument: 'after' }
        );

        return article;
    };

    public removeLikeArticle = async function (id: string, userId: string) {
        await ArticleModel.findOneAndUpdate(
            { _id: id },
            { $pull: { likesUsers: userId }, $inc: { likesCount: -1 } },
            { returnDocument: 'after' }
        );
    };

    public addCommentArticle = async function (articleId: string, commentId: string) {
        const article = await ArticleModel.findOneAndUpdate(
            { _id: articleId },
            { $push: { comments: commentId } },
            { returnDocument: 'after' }
        );

        return article;
    };

    public removeCommentArticle = async function (articleId: string, commentId: string) {
        const article = await ArticleModel.findOneAndUpdate(
            { _id: new ObjectId(articleId) },
            { $pull: { comments: new ObjectId(commentId) } },
            { returnDocument: 'after' }
        );
        return article;
    };
}
