const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    body: { type: String, required: true },
    userId: { type: ObjectId, required: true },
    createdAt: { type: Number, required: true },
    likesCount: { type: Number, default: 0 },
    likesUsers: [{ type: ObjectId }],
});

commentSchema.statics.creating = async function (userId, body) {
    if (!body) {
        throw new Error('Комментарий пустой.');
    }

    const comment = await this.create({
        userId: userId,
        body: body,
        createdAt: new Date(),
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
        { $push: { likesUsers: userId }, $inc: { likesCount: 1 } }
    );

    return comment;
};

commentSchema.statics.removeLike = async function (commentId, userId) {
    const comment = await this.findOneAndUpdate(
        {
            _id: commentId,
        },
        { $pull: { likesUsers: userId }, $inc: { likesCount: -1 } }
    );

    return comment;
};

module.exports = model('Comment', commentSchema);
