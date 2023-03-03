import { NextFunction, Request, Response } from 'express';
import Article from '../models/article.model';

export const checkLike = async (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.id;
    const userId = req.currentUser._id;

    try {
        const article = await Article.findOne({
            $and: [{ _id: articleId }, { likesUsers: { $in: userId } }],
        });

        if (article) return res.status(400).json({ message: 'Вы уже оценили эту статью.' });

        next();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const checkRemoveLike = async (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.id;
    const userId = req.currentUser._id;

    try {
        const article = await Article.findOne({
            $and: [{ _id: articleId }, { likesUsers: { $in: userId } }],
        });

        if (!article) return res.status(400).json({ message: 'Вы уже убрали оценку с этой статьи.' });

        next();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
