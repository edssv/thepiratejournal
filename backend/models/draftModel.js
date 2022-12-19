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
    created_on: { type: Number, required: true },
});

draftSchema.statics.creating = async function (authorId, authorUsername, title, cover, blocks) {
    const draft = await this.create({
        author: { _id: authorId, username: authorUsername },
        title,
        cover,
        blocks,
        created_on: new Date(),
    });

    return draft;
};

draftSchema.statics.getOne = async function (id) {
    const draft = await this.findById(id);

    return { ...draft._doc, isPublished: false };
};

module.exports = model('Draft', draftSchema);
