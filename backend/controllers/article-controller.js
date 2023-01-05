const Article = require('../models/article-model');
const Draft = require('../models/draftModel');
const User = require('../models/user-model');
const { likeNotification, commentNotification } = require('../service/notification-service');

const creating = async (req, res) => {
    const authorId = req.user._id;
    const authorUsername = req.user.username;
    const { intent, title, cover, blocks, tags, category, saveFromDraft, draftId } = req.body;
    try {
        if (intent === 'draft') {
            const draft = await Draft.creating(
                authorId,
                authorUsername,
                title,
                cover,
                blocks,
                tags,
                category,
            );
            return res.json(draft);
        }

        const article = await Article.creating(
            authorId,
            authorUsername,
            title,
            cover,
            blocks,
            tags,
            category,
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
    const { title, cover, blocks, tags, category } = req.body;
    try {
        await Article.editing(articleId, title, cover, blocks, tags, category);
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
            hasSubscription = hasSubscription.length !== 0;

            hasBookmark = await User.find({
                $and: [{ _id: currentUser._id }, { bookmarks: { $in: id } }],
            });
            hasBookmark = hasBookmark.length !== 0;
        }

        const comments = [];
        for (let i = 0; i < article.comments.length; i++) {
            comments.push({
                comment: article.comments[i],
                author: await User.findOne(
                    { _id: article.comments[i].author },
                    { username: 1, avatar: 1 },
                ),
            });
        }

        res.status(200).json({
            ...article,
            comments,
            author: {
                _id: author._id,
                username: author.username,
                avatar: author.avatar,
                subscribers_count: author.followers.length,
            },
            viewer: {
                hasSubscription: hasSubscription,
                hasBookmark: hasBookmark,
                isLike: Boolean(isLike),
            },
        });
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
    const { commentText } = req.body;

    try {
        const article = await Article.addComment(articleId, user._id, commentText);
        await commentNotification(article.author._id, user);

        res.status(200).json({ message: 'Спасибо за комментарий!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeComment = async (req, res) => {
    const articleId = req.params.id;
    const user = req.user;
    const { commentId } = req.body;

    try {
        await Article.removeComment(articleId, user._id, commentId);

        res.status(200).json({ message: 'Комментарий удален!' });
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
    like,
    removeLike,
    addComment,
    removeComment,
};
