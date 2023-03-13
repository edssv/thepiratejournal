import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { Blog } from '../lib/interfaces';

const BlogSchema = new Schema({
    title: { type: String, required: true },
    searchTitle: { type: String, required: true },
    description: { type: String },
    cover: { type: String },
    blocks: { type: Array, required: true },
    tags: [{ type: String }],
    category: {
        name: { type: String },
        game: { type: String },
        key: { type: String },
    },
    readingTime: { type: Number },
    author: {
        _id: { type: ObjectId, required: true },
        username: { type: String, required: true },
    },
    createdAt: { type: Number, default: Date.now, required: true },
    updatedAt: { type: Number, default: Date.now, required: true },
    viewsCount: { type: Number, default: 0 },
    isPublished: Boolean,
    isDeleted: Boolean,
});

const Blog = model<Blog>('Blog', BlogSchema);

export default Blog;
