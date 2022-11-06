const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    author: {
        id: { type: String, required: true },
        userName: { type: String, required: true },
    },
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

module.exports = model('Article', ArticleSchema);