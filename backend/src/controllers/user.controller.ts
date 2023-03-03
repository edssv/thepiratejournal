import { Request, Response } from 'express';

import UserService from '../service/user.service';
import User from '../models/user.model';

export default class UserController {
    public UserService = new UserService();

    public getUser = async (req: Request, res: Response) => {
        const username = req.params.username;
        const category = req.params.category;
        const currentUser = req.currentUser;

        try {
            const data = await this.UserService.getUser(username, category);

            let isOwner;
            let hasSubscription;
            if (currentUser) {
                isOwner = data?.user._id.toString() === currentUser._id.toString();
                hasSubscription = await User.find({
                    $and: [{ _id: data?.user._id }, { followers: { $in: currentUser._id.toString() } }],
                });
                hasSubscription = hasSubscription.length !== 0;
            }

            if (!isOwner && category === 'drafts') return;

            if (isOwner) return res.status(200).json({ user: data?.user, content: data?.content, isOwner });

            res.status(200).json({
                user: data?.user,
                content: data?.content,
                viewer: { hasSubscription: hasSubscription },
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public follow = async (req: Request, res: Response) => {
        const followerId = req.currentUser.id;
        const idolUsername = req.params.username;

        try {
            await this.UserService.follow(followerId, idolUsername);

            res.status(200).json({ message: 'Ты подписался на обновления автора!' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public unFollow = async (req: Request, res: Response) => {
        const followerId = req.currentUser.id;
        const idolUsername = req.params.username;

        try {
            await this.UserService.unFollow(followerId, idolUsername);

            res.status(200).json({ message: 'Ты отписался от обновлений автора!' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public bookmark = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const userId = req.currentUser._id;
        const method = req.method;

        try {
            if (method === 'POST') {
                await this.UserService.addBookmark(userId, articleId);
                return res.status(200).json({ message: 'Статья добавлена в закладки' });
            } else if (method === 'DELETE') {
                await this.UserService.removeBookmark(userId, articleId);
                return res.status(200).json({ message: 'Статья удалена из закладок' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getNotifications = async (req: Request, res: Response) => {
        const userId = req.currentUser._id;
        const queryParams = req.query;

        try {
            const user = await User.findById(userId);

            const skip = Number(queryParams.limit) * Number(queryParams.page);
            const limitNotifications = user?.notifications.slice(skip, Number(skip) + Number(queryParams.limit));

            res.status(200).json({
                notifications: { list: limitNotifications, totalCount: user?.notifications.length },
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public deleteNotification = async (req: Request, res: Response) => {
        const userId = req.currentUser._id;
        const notificationId = req.params.id;

        try {
            const notification = await User.findByIdAndUpdate(userId, {
                $pull: { notifications: { _id: notificationId } },
            });

            res.status(200).json({ notification });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}
