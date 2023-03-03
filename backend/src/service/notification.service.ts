import { User as IUser } from '../lib/interfaces';
import User from '../models/user.model';

const likeNotification = async (authorId: string, user: IUser) => {
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
        { returnDocument: 'after' }
    );
};

const commentNotification = async (authorId: string, user: IUser) => {
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
        { returnDocument: 'after' }
    );
};

const deleteNotification = async (authorId: string, user: IUser, notificationId: string) => {
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
        { returnDocument: 'after' }
    );
};

module.exports = { likeNotification, commentNotification, deleteNotification };
