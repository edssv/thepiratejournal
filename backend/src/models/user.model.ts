import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

import { User } from '@shared/interfaces/user.interface';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    activation_link: { type: String },
    role: String,
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
                image: String,
            },
        },
    ],
    time: { type: Number, default: new Date() },
});

const User = model<User>('User', UserSchema);

export default User;
