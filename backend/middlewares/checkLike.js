const Article = require('../models/article-model');

const checkLike = async (req, res, next) => {
    const articleId = req.params.id;
    const userId = req.user._id;

    try {
        const article = await Article.findOne({ _id: articleId, 'likes.users': { $in: userId } });

        if (article) return res.status(400).json({ message: 'Вы уже оценили эту статью.' });

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const checkRemoveLike = async (req, res, next) => {
    const articleId = req.params.id;
    const userId = req.user._id;

    try {
        const article = await Article.findOne({ _id: articleId, 'likes.users': { $in: userId } });

        if (!article)
            return res.status(400).json({ message: 'Вы уже убрали оценку с этой статьи.' });

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { checkLike, checkRemoveLike };
