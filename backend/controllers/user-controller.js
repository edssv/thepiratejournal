const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');
const User = require('../models/user-model');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (e) {
        res.status(400).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    const username = req.params.username;
    const currentUser = req.currentUser;

    try {
        const { user, articles, appreciated, drafts, bookmarks } = await User.getUser(username);

        let isOwner = false;
        let hasSubscription = false;
        if (currentUser) {
            isOwner = user._id.toString() === currentUser._id.toString() ? true : false;
            hasSubscription = await User.find({
                $and: [{ _id: user._id }, { followers: { $in: currentUser._id.toString() } }],
            });
            hasSubscription = hasSubscription.length !== 0 ? true : false;
        }

        if (isOwner)
            return res
                .status(200)
                .json({ user, articles, appreciated, bookmarks, drafts, isOwner });

        res.status(200).json({
            user,
            articles,
            appreciated,

            viewer: { hasSubscription: hasSubscription },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const follow = async (req, res) => {
    const followerId = req.user.id;
    const idolUsername = req.params.username;
    console.log(followerId);

    try {
        await User.follow(followerId, idolUsername);

        res.status(200).json({ message: 'Ты подписался на обновления автора!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const unFollow = async (req, res) => {
    const followerId = req.user.id;
    const idolUsername = req.params.username;
    console.log(followerId);

    try {
        await User.unFollow(followerId, idolUsername);

        res.status(200).json({ message: 'Ты отписался от обновлений автора!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const bookmark = async (req, res) => {
    const articleId = req.params.id;
    const userId = req.user._id;
    const method = req.method;

    try {
        if (method === 'POST') {
            await User.addBookmark(userId, articleId);
            return res.status(200).json({ message: 'Статья добавлена в закладки' });
        } else if (method === 'DELETE') {
            await User.removeBookmark(userId, articleId);
            return res.status(200).json({ message: 'Статья удалена из закладок' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNotifications = async (req, res) => {
    const userId = req.user._id;

    try {
        const { notifications } = await User.findById(userId, { notifications: 1, _id: 0 });

        res.status(200).json({ notifications });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    const userId = req.user._id;
    const notificationId = req.params.id;

    try {
        const notification = await User.findByIdAndUpdate(userId, {
            $pull: { notifications: { _id: notificationId } },
        });

        res.status(200).json({ notification });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    follow,
    unFollow,
    bookmark,
    getNotifications,
    deleteNotification,
};
