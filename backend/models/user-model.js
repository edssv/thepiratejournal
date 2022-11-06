const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    avatar: { type: String },
    activationLink: { type: String },
});

module.exports = model('User', UserSchema);
