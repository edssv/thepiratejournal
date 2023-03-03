import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { Article } from '../lib/interfaces';

const ArticleSchema = new Schema({
    title: { type: String, required: true },
    searchTitle: { type: String, required: true },
    description: { type: String },
    cover: { type: String, required: true },
    blocks: { type: Array, required: true },

    tags: [{ type: String }],
    category: {
        name: { type: String, required: true },
        game: { type: String },
        key: { type: String, required: true },
    },
    readingTime: { type: Number, required: true },
    author: {
        _id: { type: ObjectId, required: true },
        username: { type: String, required: true },
    },
    createdAt: { type: Number, default: new Date(), required: true },
    updatedAt: { type: Number, default: new Date(), required: true },
    comments: [{ type: Object }],
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    likesUsers: [{ type: ObjectId }],
    isPublished: Boolean,
    isDeleted: Boolean,
});

const Article = model<Article>('Article', ArticleSchema);

export default Article;
