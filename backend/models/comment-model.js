const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
    created_on: { type: Number, required: true },
    likes: { count: Number, users: [{ type: Object, required: true }] },
});

commentSchema.statics.creating = async function (userId, commentText) {
    if (!commentText) {
        throw new Error('Комментарий пустой.');
    }

    const comment = await this.create({
        author: userId,
        text: commentText,
        created_on: new Date(),
    });

    return comment;
};

commentSchema.statics.remove = async function (commentId) {
    await this.findOneAndRemove({ _id: commentId });
};

commentSchema.statics.like = async function (commentId, userId) {
    const comment = await this.findOneAndUpdate(
        {
            _id: commentId,
        },
        { $push: { 'likes.users': { userId } }, $inc: { 'likes.count': 1 } },
    );

    return comment;
};

commentSchema.statics.removeLike = async function (commentId, userId) {
    const comment = await this.findOneAndUpdate(
        {
            _id: commentId,
        },
        { $pull: { 'likes.users': { userId } }, $inc: { 'likes.count': -1 } },
    );

    return comment;
};

module.exports = model('Comment', commentSchema);
