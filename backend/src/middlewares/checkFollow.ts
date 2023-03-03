import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';

export const checkFollow = async (req: Request, res: Response, next: NextFunction) => {
    const followerId = req.currentUser.id;
    const idolUsername = req.params.username;

    try {
        const idol = await User.findOne({ username: idolUsername });
        const idolId = idol?._id.toString();

        const user = await User.findOne({
            $and: [{ _id: followerId }, { follow: { $in: idolId } }],
        });

        if (user) return res.status(400).json({ message: 'Вы уже подписаны на этого автора.' });

        next();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const checkUnFollow = async (req: Request, res: Response, next: NextFunction) => {
    const followerId = req.currentUser.id;
    const idolUsername = req.params.username;

    try {
        const idol = await User.findOne({ username: idolUsername });
        const idolId = idol?._id.toString();

        const user = await User.findOne({
            $and: [{ _id: followerId }, { follow: { $in: idolId } }],
        });

        if (!user) return res.status(400).json({ message: 'Вы уже отписались от этого автора.' });

        next();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
