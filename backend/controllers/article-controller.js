const { ObjectId } = require('mongodb');

const Article = require('../models/article-model');
const Comment = require('../models/comment-model');
const Draft = require('../models/draftModel');
const User = require('../models/user-model');
const { likeNotification, commentNotification } = require('../service/notification-service');

const creating = async (req, res) => {
    const authorId = req.user._id;
    const authorUsername = req.user.username;
    const data = req.body;

    try {
        const article = await Article.creating(authorId, authorUsername, data);

        if (data.saveFromDraft) {
            await Draft.deleteOne({ _id: data.draftId });
        }

        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findOneAndUpdate({ _id: id }, { isDeleted: true, isPublished: false });

        if (!article) {
            await Draft.deleteOne({ _id: id });
            return res.status(200).json({ message: 'Черновик удалён' });
        }

        res.status(200).json({ message: 'Статья удалена' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editing = async (req, res) => {
    const articleId = req.params.id;
    const { title, description, cover, blocks, tags, category, readingTime } = req.body;

    try {
        await Article.editing(articleId, title, description, cover, blocks, tags, category, readingTime);
        res.status(200).json({ message: 'Статья обновлена' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    const section = req.params.section;
    const currentUser = req.currentUser;

    try {
        if (section === 'following' && !currentUser) {
            return res.status(401).json({
                message: 'Войди в систему, чтобы просматривать обновления авторов, на которых ты подписан.',
            });
        }

        const articles = await Article.getAll(section, currentUser);

        if (!articles.length) {
            return res.status(204).json(articles);
        }

        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const searchArticles = async (req, res) => {
    const categoryName = req.params.category;
    const query = req.query;

    try {
        const articles = await Article.searchArticles(categoryName, query);
        return res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOne = async (req, res) => {
    const id = req.params.id;
    const currentUser = req.currentUser;

    try {
        const article = await Article.getOne(id);

        if (!article) {
            const data = await Draft.getOne(id);
            return res.status(200).json(data);
        }

        const author = await User.findById(article.author._id);
        console.log(String(author._id));

        if (!author) return res.status(200).json({ article, message: 'Автор статьи не найден' });

        let isLike;
        let hasSubscription;
        let hasBookmark;

        if (currentUser) {
            isLike = await User.findOne({
                _id: currentUser._id,
                appreciated: { $in: article._id.toString() },
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
            ...article,
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
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getComments = async (req, res) => {
    const articleId = req.params.id;
    const query = req.query;
    const currentUser = req.currentUser;

    try {
        const { limitComments, totalCount } = await Article.getComments(articleId, query);
        const commentsList = [];
        const comments = await Comment.find({ _id: { $in: limitComments } });

        for (let i = 0; i < comments.length; i++) {
            if (currentUser) {
                commentsList.push({
                    ...comments[i]._doc,
                    author: await User.findOne({ _id: comments[i].userId }, { username: 1, avatar: 1, _id: 0 }),
                    viewer: {
                        isLike: Boolean(
                            await Comment.findOne({
                                $and: [{ _id: comments[i]._id }, { likesUsers: currentUser._id }],
                            })
                        ),
                    },
                });
            } else {
                commentsList.push({
                    comment: comments[i],
                    author: await User.findOne({ _id: comments[i].author }, { username: 1, avatar: 1 }),
                });
            }
        }

        res.status(200).json({ commentsList, totalCount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNext = async (req, res) => {
    const articleId = req.params.id;

    try {
        const articles = await Article.find({ _id: { $ne: articleId }, isPublished: true }).limit(3);

        res.status(200).json({ articles });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getLastTags = async (req, res) => {
    try {
        const articles = await Article.find({ isPublished: true }).limit(8).exec();

        const tags = articles
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 8);

        res.status(200).json({ tags });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMostPopularArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ isPublished: true }).sort({ views: -1 });

        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAuthorChoice = async (req, res) => {
    try {
        const articles = await Article.find({ isPublished: true }).sort({ likes: -1 }).limit(3);

        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getBestOfWeak = async (req, res) => {
    try {
        const articles = await Article.find({ isPublished: true }).sort({ likes: 1 }).limit(6);

        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNewest = async (req, res) => {
    try {
        const articles = await Article.find({ isPublished: true }).sort({ createdAt: 1 }).limit(16);

        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const like = async (req, res) => {
    const articleId = req.params.id;
    const user = req.user;

    try {
        const article = await Article.like(articleId, user._id);
        await User.appreciated(user._id, articleId);
        await likeNotification(article.author._id, user);

        res.status(200).json({ message: 'Спасибо за оценку!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeLike = async (req, res) => {
    const articleId = req.params.id;
    const userId = req.user._id;

    try {
        await Article.removeLike(articleId, userId);
        await User.appreciated(userId, articleId, remove);

        res.status(200).json({ message: 'Ваша оценка удалена' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addComment = async (req, res) => {
    const articleId = req.params.id;
    const user = req.user;
    const { body } = req.body;

    try {
        const comment = await Comment.creating(user._id, body);
        const article = await Article.addComment(articleId, comment._id);
        await commentNotification(article.author._id, user);

        const commentResponse = {
            ...comment._doc,
            author: await User.findOne({ _id: user._id }, { username: 1, avatar: 1 }),
            viewer: {
                isLike: false,
            },
        };

        res.status(200).json(commentResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeComment = async (req, res) => {
    const articleId = req.params.id;
    const { commentId } = req.body;

    try {
        await Article.removeComment(articleId, commentId);
        await Comment.remove(commentId);

        res.status(200).json({ message: 'Комментарий удален!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const likeComment = async (req, res) => {
    const commentId = req.params.commentId;
    const user = req.user;

    try {
        await Comment.like(commentId, user._id);

        res.status(200).json({ message: 'Ты оценил комментарий!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeLikeComment = async (req, res) => {
    const commentId = req.params.commentId;
    const user = req.user;

    try {
        await Comment.removeLike(commentId, user._id);

        res.status(200).json({ message: 'Ты убрал оценку с комментария!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    creating,
    remove,
    editing,
    getAll,
    searchArticles,
    getOne,
    getComments,
    getNext,
    getLastTags,
    getMostPopularArticle,
    getAuthorChoice,
    getBestOfWeak,
    getNewest,
    like,
    removeLike,
    addComment,
    removeComment,
    likeComment,
    removeLikeComment,
};
