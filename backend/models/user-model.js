const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    avatar: { type: String },
    activationLink: { type: String },
});

module.exports = model('User', UserSchema);
