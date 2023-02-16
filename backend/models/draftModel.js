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
    tags: [{ type: String }],
    category: {
        name: String,
        game: String,
        key: String,
    },
    created_on: { type: Number, required: true },
});

draftSchema.statics.creating = async function (authorId, authorUsername, data) {
    const draftIsExists = await this.findById(data._id);

    if (draftIsExists) {
        const draft = await this.updateOne({ _id: data._id }, Object.assign(data, { created_on: new Date() }));

        return draft;
    }

    const draft = await this.create({
        author: { _id: authorId, username: authorUsername },
        title: data.title,
        cover: data.cover,
        blocks: data.blocks,
        tags: data.tags,
        category: data.category,
        created_on: new Date(),
    });

    return draft;
};

draftSchema.statics.getOne = async function (id) {
    const draft = await this.findById(id);

    return { ...draft._doc, isPublished: false };
};

module.exports = model('Draft', draftSchema);
