const Comment = require('../models/comment-model');

const checkCommentLike = async (req, res, next) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    try {
        const comment = await Comment.findOne({
            $and: [{ _id: commentId }, { 'likesUsers.ObjectId': userId }],
        });

        if (comment) return res.status(400).json({ message: 'Вы уже оценили этот комментарий.' });

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const checkRemoveCommentLike = async (req, res, next) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    try {
        const comment = await Comment.findOne({
            $and: [{ _id: commentId }, { likesUsers: userId }],
        });

        if (!comment) return res.status(400).json({ message: 'Вы уже убрали оценку с этого комментария.' });

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { checkCommentLike, checkRemoveCommentLike };
