import Comment from '../models/comment.model';

export default class CommentService {
    public createCommentArticle = async function (userId: string, body: string) {
        if (!body) {
            throw new Error('Комментарий пустой.');
        }

        const comment = await Comment.create({
            userId: userId,
            body: body,
            createdAt: new Date(),
        });

        return comment;
    };

    public removeCommentArticle = async function (commentId: string) {
        await Comment.findOneAndRemove({ _id: commentId });
    };

    public likeCommentArticle = async function (commentId: string, userId: string) {
        const comment = await Comment.findOneAndUpdate(
            {
                _id: commentId,
            },
            { $push: { likesUsers: userId }, $inc: { likesCount: 1 } }
        );

        return comment;
    };

    public removeLikeCommentArticle = async function (commentId: string, userId: string) {
        const comment = await Comment.findOneAndUpdate(
            {
                _id: commentId,
            },
            { $pull: { likesUsers: userId }, $inc: { likesCount: -1 } }
        );

        return comment;
    };
}
