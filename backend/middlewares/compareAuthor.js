const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const Article = require('../models/article-model');

const compareAuthor = async (req, res, next) => {
    const articleId = req.params.id;
    try {
        const article = await Article.findById(articleId);

        if (!article) return res.status(400).json({ message: 'Статья не найдена.' });

        const authorId = article.author._id;

        if (!authorId) return res.status(400).json({ message: 'Автор статьи не найден.' });

        const editorId = req.user._id.toString();

        if (!editorId)
            return res.status(400).json({ message: 'Системе не удалось вас распознать.' });

        if (authorId !== editorId) {
            return res.status(401).json({ message: 'Вы не являетесь автором.' });
        }

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = compareAuthor;
