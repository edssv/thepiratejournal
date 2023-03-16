import { Request, Response } from 'express';
import ArticleService from '../service/article.service';
import Article from '../models/article.model';
import CommentService from '../service/comment.service';
import Comment from '../models/comment.model';
import Draft from '../models/draft.model';
import UserService from '../service/user.service';
import User from '../models/user.model';
import { ObjectId } from 'mongodb';

const { likeNotification, commentNotification } = require('../service/notification.service');

class ArticleController {
    public ArticleService = new ArticleService();
    public CommentService = new CommentService();
    public UserService = new UserService();

    public creating = async (req: Request, res: Response) => {
        const authorId = req.currentUser._id;
        const authorUsername = req.currentUser.username;
        const data = req.body;

        try {
            const article = await this.ArticleService.createArticle(authorId, authorUsername, data);

            if (data.saveFromDraft) {
                await Draft.deleteOne({ _id: data.draftId });
            }

            res.json(article);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public remove = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const article = await Article.findOneAndUpdate({ _id: id }, { isDeleted: true, isPublished: false });

            if (!article) {
                await Draft.deleteOne({ _id: id });
                return res.status(200).json({ message: 'Черновик удалён' });
            }

            res.status(200).json({ message: 'Статья удалена' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public editing = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const articleData = req.body;

        try {
            await this.ArticleService.editArticle(articleId, articleData);
            res.status(200).json({ message: 'Статья обновлена' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getAll = async (req: Request, res: Response) => {
        const section = req.params.section;
        const currentUser = req.currentUser;

        try {
            if (section === 'following' && !currentUser) {
                return res.status(401).json({
                    message: 'Войди в систему, чтобы просматривать обновления авторов, на которых ты подписан.',
                });
            }

            const articles = await this.ArticleService.getAllArticles(section, currentUser);

            if (!articles?.length) {
                return res.status(204).json(articles);
            }

            res.status(200).json(articles);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public search = async (req: Request, res: Response) => {
        const categoryName = req.params.category;
        const query = req.query;

        try {
            const articles = await this.ArticleService.searchArticles(categoryName, query);
            return res.status(200).json(articles);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getOne = async (req: Request, res: Response) => {
        const id = req.params.id;
        const currentUser = req.currentUser;

        try {
            const article = await this.ArticleService.getOneArticle(id);

            const author = await User.findById(article?.author?._id);

            if (!author) return res.status(200).json({ article, message: 'Автор статьи не найден' });

            let isLike;
            let hasSubscription;
            let hasBookmark;

            if (currentUser) {
                isLike = await User.findOne({
                    _id: currentUser._id,
                    appreciated: { $in: article?._id.toString() },
                });

                hasSubscription = await User.find({
                    $and: [{ _id: author._id }, { followers: { $in: currentUser._id.toString() } }],
                });
                hasSubscription = Boolean(hasSubscription.length);

                hasBookmark = await User.find({
                    $and: [{ _id: currentUser._id }, { bookmarks: { $in: id } }],
                });
                hasBookmark = Boolean(hasBookmark.length);
            }

            res.status(200).json({
                ...article?.toJSON(),
                author: {
                    _id: author._id,
                    username: author.username,
                    avatar: author.avatar,
                    subscribersCount: author.followers.length,
                },
                viewer: {
                    hasSubscription,
                    hasBookmark,
                    isLike: Boolean(isLike),
                },
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getComments = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const query = req.query;
        const currentUser = req.currentUser;

        try {
            const { limitComments, totalCount } = await this.ArticleService.getCommentsArticle(articleId, query);
            const commentsList = [];
            const comments = await Comment.find({ _id: { $in: limitComments } });

            for (let i = 0; i < comments.length; i++) {
                if (currentUser) {
                    commentsList.push(
                        Object.assign({
                            ...comments[i].toJSON(),
                            author: await User.findOne({ _id: comments[i].userId }, { username: 1, avatar: 1, _id: 0 }),
                            viewer: {
                                isLike: Boolean(
                                    await Comment.findOne({
                                        $and: [{ _id: comments[i]._id }, { likesUsers: currentUser._id }],
                                    })
                                ),
                            },
                        })
                    );
                } else {
                    commentsList.push({
                        comment: comments[i],
                        author: await User.findOne({ _id: comments[i].userId }, { username: 1, avatar: 1 }),
                    });
                }
            }

            res.status(200).json({ commentsList, totalCount });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getNext = async (req: Request, res: Response) => {
        const articleId = req.params.id;

        try {
            const articles = await Article.find({ _id: { $ne: articleId }, isPublished: true }).limit(3);

            res.status(200).json({ articles });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getLastTags = async (req: Request, res: Response) => {
        try {
            const articles = await Article.find({ isPublished: true }).limit(8).exec();

            const tags = articles
                .map((obj: any) => obj.tags)
                .flat()
                .slice(0, 8);

            res.status(200).json({ tags });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getMostPopularArticle = async (req: Request, res: Response) => {
        try {
            const article = await Article.findOne({ isPublished: true }).sort({ views: -1 });

            res.status(200).json(article);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getAuthorChoice = async (req: Request, res: Response) => {
        try {
            const articles = await Article.find({ isPublished: true }).sort({ likes: -1 }).limit(3);

            res.status(200).json(articles);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getBestOfWeak = async (req: Request, res: Response) => {
        try {
            const articles = await Article.find({ isPublished: true }).sort({ likes: 1 }).limit(6);

            res.status(200).json(articles);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getNewest = async (req: Request, res: Response) => {
        try {
            const articles = await Article.find({ isPublished: true }).sort({ createdAt: 1 }).limit(16);

            res.status(200).json(articles);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public like = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const user = req.currentUser;

        try {
            const article = await this.ArticleService.likeArticle(articleId, user._id);
            await this.UserService.appreciated(user._id, articleId);
            await likeNotification(article?.author._id, user);

            res.status(200).json({ message: 'Спасибо за оценку!' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public removeLike = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const userId = req.currentUser._id;

        try {
            await this.ArticleService.removeLikeArticle(articleId, userId);
            await this.UserService.appreciated(userId, articleId, true);

            res.status(200).json({ message: 'Ваша оценка удалена' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public addComment = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const user = req.currentUser;
        const { body } = req.body;

        try {
            const comment = await this.CommentService.createCommentArticle(user._id, body);
            const article = await this.ArticleService.addCommentArticle(articleId, comment._id);
            await commentNotification(article?.author._id, user);

            const commentResponse = Object.assign({
                ...comment.toJSON(),
                author: await User.findOne({ _id: user._id }, { username: 1, avatar: 1 }),

                viewer: {
                    isLike: false,
                },
            });

            res.status(200).json(commentResponse);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public removeComment = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const { commentId } = req.body;

        try {
            await this.ArticleService.removeCommentArticle(articleId, commentId);
            await Comment.deleteOne(new ObjectId(commentId));

            res.status(200).json({ message: 'Комментарий удален!' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public likeComment = async (req: Request, res: Response) => {
        const commentId = req.params.commentId;
        const user = req.currentUser;

        try {
            await this.CommentService.likeCommentArticle(commentId, user._id);

            res.status(200).json({ message: 'Ты оценил комментарий!' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public removeLikeComment = async (req: Request, res: Response) => {
        const commentId = req.params.commentId;
        const user = req.currentUser;

        try {
            await this.CommentService.removeLikeCommentArticle(commentId, user._id);

            res.status(200).json({ message: 'Ты убрал оценку с комментария!' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}

export default new ArticleController();
