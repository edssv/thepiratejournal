const { Schema, model } = require('mongoose');
const UserDto = require('../dtos/user-dto');

const articleSchema = new Schema({
    author: {
        _id: { type: String, required: true },
        username: { type: String, required: true },
    },
    title: { type: String },
    cover: {
        type: Object,
        required: true,
    },
    blocks: {
        type: Array,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    views: {
        count: {
            type: Number,
            default: 0,
        },
    },
    likes: {
        count: {
            type: Number,
            default: 0,
        },
    },
});

articleSchema.statics.creating = async function (
    authorId,
    authorUsername,
    title,
    cover,
    blocks,
    time,
) {
    const article = await this.create({
        author: { _id: authorId, username: authorUsername },
        title,
        cover,
        blocks,
        timestamp: time,
    });

    return article;
};

articleSchema.statics.editing = async function (articleId, title, cover, blocks) {
    if (!title || !cover || !blocks) {
        throw Error('Заголовок обложка и блоки обязательны.');
    }

    const article = await this.updateOne(
        { _id: articleId },
        {
            title: title,
            cover: cover,
            blocks: blocks,
        },
    );

    return;
};

articleSchema.statics.getOne = async function (id) {
    const article = await this.findOneAndUpdate(
        { _id: id },
        { $inc: { 'views.count': 1 } },
        { returnDocument: 'after' },
    );

    return article;
};

module.exports = model('Article', articleSchema);
