import { NextFunction, Request, Response } from 'express';
import Article from '../models/article.model';
import Comment from '../models/comment.model';

export const compareCommentAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.id;
    const { commentId } = req.body;
    const currentUserId = String(req.currentUser._id);

    try {
        const article = await Article.findOne({
            $and: [{ _id: articleId }, { 'comments[]': commentId }],
        });

        if (!article) {
            return res.status(400).json({ message: 'Не удалось найти статью.' });
        }

        const comment = await Comment.findOne({ _id: commentId });

        if (currentUserId !== String(comment?.userId)) {
            return res.status(400).json({ message: 'Вы не являетесь автором комментария.' });
        }

        next();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = compareCommentAuthor;
