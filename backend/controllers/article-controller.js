const Article = require('../models/article-model');
const Draft = require('../models/draftModel');
const User = require('../models/user-model');

const creating = async (req, res) => {
    const authorId = req.user._id;
    const authorUsername = req.user.username;
    const { intent, title, cover, blocks, category, time, saveFromDraft, draftId } = req.body;
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
            category,
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

const getAll = async (req, res) => {
    const section = req.params.section;
    const currentUser = req.currentUser;

    try {
        if (section === 'following' && !currentUser) {
            return res.status(401).json({
                message:
                    'Войди в систему, чтобы просматривать обновления авторов, на которых ты подписан.',
            });
        }

        const articles = await Article.getAll(section, currentUser);

        if (articles.length === 0) {
            return res.status(204).json(articles);
        }

        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const searchArticles = async (req, res) => {
    const categoryName = req.params.category;
    const sortType = req.query.sort;
    const searchValue = req.query.search;

    try {
        const articles = await Article.searchArticles(categoryName, sortType, searchValue);
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
            hasSubscription = hasSubscription.length !== 0 ? true : false;

            hasBookmark = await User.find({
                $and: [{ _id: currentUser._id }, { bookmarks: { $in: id } }],
            });
            hasBookmark = hasBookmark.length !== 0 ? true : false;
        }

        res.status(200).json({
            ...article._doc,
            author: { _id: author._id, username: author.username, avatar: author.avatar },
            viewer: { hasSubscription: hasSubscription, hasBookmark: hasBookmark, isLike: isLike },
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

module.exports = { creating, remove, editing, getAll, searchArticles, getOne, like, removeLike };
