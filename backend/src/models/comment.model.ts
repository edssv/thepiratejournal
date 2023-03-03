import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { Comment } from '../lib/interfaces';

const CommentSchema = new Schema({
    body: { type: String, required: true },
    userId: { type: ObjectId, required: true },
    createdAt: { type: Number, required: true },
    likesCount: { type: Number, default: 0 },
    likesUsers: [{ type: ObjectId }],
});

const Comment = model<Comment>('Comment', CommentSchema);

export default Comment;
