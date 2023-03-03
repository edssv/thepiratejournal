import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { Draft } from '../lib/interfaces';

const DraftSchema = new Schema({
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

const Draft = model<Draft>('Draft', DraftSchema);

export default Draft;
