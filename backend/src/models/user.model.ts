import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User } from '../lib/interfaces';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    avatar: { type: String },
    activation_link: { type: String },
    follow: [{ type: String }],
    followers: [{ type: String }],
    info: { country: String, city: String },
    appreciated: [{ type: String }],
    bookmarks: [{ type: String }],
    notifications: [
        {
            action_key: { type: String, required: true },
            createdAt: { type: Number, default: new Date() },
            actor: {
                id: { type: ObjectId, required: true },
                username: { type: String, required: true },
                avatar: String,
            },
        },
    ],
    time: { type: Number, default: new Date() },
});

const User = model<User>('User', UserSchema);

export default User;
