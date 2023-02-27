const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const draftSchema = new Schema({
    title: { type: String },
    cover: {
        type: String,
    },
    blocks: {
        type: Array,
    },
    tags: [{ type: String }],
    category: {
        name: String,
        game: String,
        key: String,
    },
    author: {
        _id: { type: ObjectId, required: true },
        username: { type: String, required: true },
    },
    createdAt: { type: Number, default: new Date(), required: true },
});

draftSchema.statics.creating = async function (authorId, authorUsername, data) {
    const draftId = data._id || undefined;

    const draft = await this.findOneAndUpdate(
        { _id: new ObjectId(draftId) },
        {
            title: data.title,
            cover: data.cover,
            blocks: data.blocks,
            tags: data.tags,
            category: data.category,
            author: { _id: authorId, username: authorUsername },
        },
        { upsert: true }
    );

    return draft;
};

draftSchema.statics.getOne = async function (id) {
    const draft = await this.findById(id);

    return { ...draft._doc, isPublished: false };
};

module.exports = model('Draft', draftSchema);
