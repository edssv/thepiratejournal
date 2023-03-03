import Article from '../models/article.model';
import Draft from '../models/draft.model';
import User from '../models/user.model';

export default class UserService {
    public async getUser(username: string, category: string) {
        const user = await User.findOne({ username });

        if (!user) return;

        const findContent = async () => {
            if (category === 'articles') {
                return await Article.find({
                    $and: [{ 'author.username': username }, { isPublished: true }],
                });
            }

            if (category === 'appreciated') {
                return await Article.find({ _id: { $in: user.appreciated } });
            }

            if (category === 'bookmarks') {
                return await Article.find({ _id: { $in: user.bookmarks } });
            }

            if (category === 'drafts') {
                return await Draft.find({ 'author._id': user._id });
            }
        };

        const content = await findContent();

        return {
            user: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                timestamp: user.time,
                info: user.info,
                followersCount: user.followers.length,
            },
            content,
        };
    }

    public async appreciated(userId: string, articleId: string, remove = false) {
        if (remove) {
            await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { appreciated: articleId } },
                { returnDocument: 'after' }
            );
            return;
        }

        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { appreciated: articleId } },
            { returnDocument: 'after' }
        );
    }

    public async follow(followerId: string, idolUsername: string) {
        const idol = await User.findOne({ username: idolUsername });
        const idolId = idol?._id.toString();

        const follower = await User.findOneAndUpdate(
            { _id: followerId },
            { $push: { follow: idolId } },
            { returnDocument: 'after' }
        );

        await User.findOneAndUpdate(
            { _id: idolId },
            {
                $push: {
                    followers: followerId,
                    notifications: {
                        action_key: 'followuser',
                        actor: {
                            id: follower?._id,
                            username: follower?.username,
                            avatar: follower?.avatar,
                        },
                    },
                },
            },
            { returnDocument: 'after' }
        );
    }

    public async unFollow(followerId: string, idolUsername: string) {
        const idol = await User.findOne({ username: idolUsername });
        const idolId = idol?._id.toString();

        const follower = await User.findOneAndUpdate(
            { _id: followerId },
            { $pull: { follow: idolId } },
            { returnDocument: 'after' }
        );

        await User.findOneAndUpdate(
            { _id: idolId },
            {
                $pull: {
                    followers: followerId,
                    notifications: {
                        action_key: 'followuser',
                        actor: {
                            id: follower?._id,
                            username: follower?.username,
                            avatar: follower?.avatar,
                        },
                    },
                },
            },
            { returnDocument: 'after' }
        );
    }

    public async addBookmark(userId: string, articleId: string) {
        await User.findOneAndUpdate({ _id: userId }, { $push: { bookmarks: articleId } }, { returnDocument: 'after' });
    }

    public async removeBookmark(userId: string, articleId: string) {
        await User.findOneAndUpdate({ _id: userId }, { $pull: { bookmarks: articleId } }, { returnDocument: 'after' });
    }
}
