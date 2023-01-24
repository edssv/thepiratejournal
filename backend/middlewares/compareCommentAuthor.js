const Article = require('../models/article-model');
const Comment = require('../models/comment-model');

const compareCommentAuthor = async (req, res, next) => {
    const articleId = req.params.id;
    const { commentId } = req.body;
    const userId = req.user._id.toString();

    try {
        const article = await Article.findOne({
            $and: [{ _id: articleId }, { 'comments[]': commentId }],
        });

        if (!article) {
            return res.status(400).json({ message: 'Не удалось найти статью.' });
        }

        const { author } = await Comment.findOne({ _id: commentId });

        if (userId !== author) {
            return res.status(400).json({ message: 'Вы не являетесь автором комментария.' });
        }

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = compareCommentAuthor;
