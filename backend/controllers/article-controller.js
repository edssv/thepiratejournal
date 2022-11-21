const Article = require('../models/article-model');
const articleService = require('../service/article-service');
const User = require('../models/user-model');

const creating = async (req, res) => {
    const authorId = req.user._id;
    const authorUsername = req.user.username;
    const { title, cover, blocks, time } = req.body;
    try {
        const article = await Article.creating(
            authorId,
            authorUsername,
            title,
            cover,
            blocks,
            time,
        );

        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const remove = async (req, res, next) => {
    try {
        const articleId = req.params.id;
        await Article.findOneAndDelete({ _id: articleId });
        res.json({
            message: 'Статья удалена',
        });
    } catch (e) {
        next(e);
    }
};
const editing = async (req, res, next) => {
    const articleId = req.params.id;
    const { title, cover, blocks } = req.body;
    try {
        await Article.editing(articleId, title, cover, blocks);
        res.status(200).json({ message: 'Статья обновлена' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAll = async (req, res, next) => {
    try {
        const articles = await Article.find().exec();
        return res.json(articles);
    } catch (e) {
        next(e);
    }
};

const getOne = async (req, res) => {
    const id = req.params.id;
    const currentUser = req.currentUser;
    try {
        const article = await Article.getOne(id);

        const author = await User.findById(article.author._id);

        if (!author) return res.status(200).json({ article, message: 'Автор статьи не найден' });

        let isLiked = '';

        if (currentUser) {
            isLiked = await User.findOne({
                _id: currentUser._id,
                liked: { $in: article._id.toString() },
            });
        }

        res.status(200).json({
            article: {
                _id: article.id,
                title: article.title,
                cover: article.cover,
                blocks: article.blocks,
                views: article.views,
                likes: article.likes,
                author: { _id: author._id, username: author.username, avatar: author.avatar },
                timestamp: article.timestamp,
            },
            isLiked: isLiked ? true : false,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOneEdit = async (req, res, next) => {
    try {
        const articleId = req.params.id;
        const article = await articleService.getOneEdit(articleId);
        res.json(article);
    } catch (e) {
        next(e);
    }
};

const like = async (req, res) => {
    const articleId = req.params.id;
    const userId = req.user._id;

    try {
        await Article.like(articleId, userId);
        await User.liked(userId, articleId);

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
        await User.liked(userId, articleId, remove);

        res.status(200).json({ message: 'Ваша оценка удалена' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { creating, remove, editing, getAll, getOne, getOneEdit, like, removeLike };
