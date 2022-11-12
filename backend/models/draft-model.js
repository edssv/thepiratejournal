const { Schema, model } = require('mongoose');

const DraftSchema = new Schema({
    author: {
        id: { type: String, required: true },
        username: { type: String, required: true },
    },
    title: { type: String },
    cover: {
        type: Object,
    },
    blocks: {
        type: Array,
    },
    timestamp: {
        type: String,
        required: true,
    },
});

module.exports = model('Draft', DraftSchema);
