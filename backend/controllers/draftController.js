const Draft = require('../models/draftModel');
const User = require('../models/user-model');

const creating = async (req, res) => {
    const authorId = req.user._id;
    const authorUsername = req.user.username;
    const data = req.body;

    try {
        const draft = await Draft.creating(authorId, authorUsername, data);

        res.json(draft);
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

module.exports = {
    creating,
    remove,
    editing,
};
