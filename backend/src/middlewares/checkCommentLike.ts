import { NextFunction, Request, Response } from 'express';
import Comment from '../models/comment.model';

export const checkCommentLike = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const userId = req.currentUser._id;

    try {
        const comment = await Comment.findOne({
            $and: [{ _id: commentId }, { 'likesUsers.ObjectId': userId }],
        });

        if (comment) return res.status(400).json({ message: 'Вы уже оценили этот комментарий.' });

        next();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const checkRemoveCommentLike = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const userId = req.currentUser._id;

    try {
        const comment = await Comment.findOne({
            $and: [{ _id: commentId }, { likesUsers: userId }],
        });

        if (!comment) return res.status(400).json({ message: 'Вы уже убрали оценку с этого комментария.' });

        next();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
