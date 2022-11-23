const { Schema, model } = require('mongoose');

const draftSchema = new Schema({
    author: {
        _id: { type: String, required: true },
        username: { type: String, required: true },
    },
    title: { type: String },
    cover: {
        type: String,
    },
    blocks: {
        type: Array,
    },
    timestamp: {
        type: String,
    },
});

draftSchema.statics.creating = async function (
    authorId,
    authorUsername,
    title,
    cover,
    blocks,
    time,
) {
    const draft = await this.create({
        author: { _id: authorId, username: authorUsername },
        title,
        cover,
        blocks,
        timestamp: time,
    });

    return draft;
};

module.exports = model('Draft', draftSchema);
