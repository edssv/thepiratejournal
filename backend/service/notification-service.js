const User = require('../models/user-model');

const likeNotification = async (authorId, user) => {
    if (authorId === user._id.toString()) {
        return;
    }

    await User.findOneAndUpdate(
        { _id: authorId },
        {
            $push: {
                notifications: {
                    action_key: 'likearticle',
                    actor: {
                        id: user._id,
                        username: user.username,
                        avatar: user.avatar,
                    },
                },
            },
        },
        { returnDocument: 'after' },
    );
};

const commentNotification = async (authorId, user) => {
    if (authorId === user._id.toString()) {
        return;
    }

    await User.findOneAndUpdate(
        { _id: authorId },
        {
            $push: {
                notifications: {
                    action_key: 'commentarticle',
                    actor: {
                        id: user._id,
                        username: user.username,
                        avatar: user.avatar,
                    },
                },
            },
        },
        { returnDocument: 'after' },
    );
};

const deleteNotification = async (authorId, user, notificationId) => {
    if (authorId === user._id.toString()) {
        return;
    }

    await User.findOneAndUpdate(
        { _id: authorId },
        {
            $pull: {
                notifications: {
                    _id: notificationId,
                },
            },
        },
        { returnDocument: 'after' },
    );
};

module.exports = { likeNotification, commentNotification, deleteNotification };
