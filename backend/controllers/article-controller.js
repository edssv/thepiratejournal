const Article = require('../models/article-model');
const Draft = require('../models/draftModel');
const User = require('../models/user-model');

const creating = async (req, res) => {
    const authorId = req.user._id;
    const authorUsername = req.user.username;
    const { intent, title, cover, blocks, time, saveFromDraft, draftId } = req.body;
    try {
        if (intent === 'draft') {
            const draft = await Draft.creating(
                authorId,
                authorUsername,
                title,
                cover,
                blocks,
                time,
            );
            return res.json(draft);
        }

        const article = await Article.creating(
            authorId,
            authorUsername,
            title,
            cover,
            blocks,
            time,
        );

        if (saveFromDraft) {
            await Draft.deleteOne({ _id: draftId });
        }

        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findOneAndDelete({ _id: id });

        if (!article) {
            await Draft.findOneAndRemove({ _id: id });
            return res.status(200).json({ message: 'Черновик удалён' });
        }

        res.status(200).json({ message: 'Статья удалена' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editing = async (req, res) => {
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

        if (!article) {
            const data = await Draft.getOne(id);
            return res.status(200).json(data);
        }

        const author = await User.findById(article.author._id);

        if (!author) return res.status(200).json({ article, message: 'Автор статьи не найден' });

        let isLike = '';

        if (currentUser) {
            isLike = await User.findOne({
                _id: currentUser._id,
                appreciated: { $in: article._id.toString() },
            });
        }

        res.status(200).json({
            ...article._doc,
            author: { _id: author._id, username: author.username, avatar: author.avatar },
            isLike: isLike ? true : false,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const like = async (req, res) => {
    const articleId = req.params.id;
    const userId = req.user._id;

    try {
        await Article.like(articleId, userId);
        await User.appreciated(userId, articleId);

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

module.exports = { creating, remove, editing, getAll, getOne, like, removeLike };
