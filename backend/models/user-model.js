const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const mailService = require('../service/mail-service');
const tokenModel = require('../models/token-model');
const Article = require('./article-model');
const Draft = require('../models/draftModel');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    avatar: { type: String },
    activationLink: { type: String },
    info: { country: String, city: String },
    appreciated: [{ type: String, required: true }],
    time: { type: Number, default: new Date() },
});

// static signup method
userSchema.statics.signup = async function (username, email, password) {
    // validation
    if (!username || !email || !password) {
        throw Error('Все поля должны быть заполнены');
    }
    if (!validator.isEmail(email)) {
        throw Error('Адрес электронной почты невалидный');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Пароль недостаточно надежный');
    }

    // check exists
    const existUsername = await this.findOne({ username });
    const existEmail = await this.findOne({ email });

    if (existUsername) {
        throw Error('Данное имя пользователя уже занято');
    }

    if (existEmail) {
        throw Error('Учетная запись с данным адресом электронной почты уже существует');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const activationLink = uuid.v4();

    const user = await this.create({ username, email, password: hash, activationLink });

    await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${activationLink}`,
    );

    return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Все поля должны быть заполнены');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Неверный адрес электронной почты');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Неверный пароль');
    }

    return user;
};

// static refresh method
userSchema.statics.refresh = async function (refreshToken) {
    if (!refreshToken) {
        throw Error('Рефреш токен отсутствует');
    }

    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const refreshTokenFromDb = await tokenModel.findOne({ refreshToken });

    if (!refreshTokenFromDb) {
        throw Error('Неверный рефреш токен');
    }

    return user;
};

userSchema.statics.getUser = async function (username) {
    const user = await this.findOne({ username });
    const articles = await Article.find({ 'author.username': username });
    const appreciated = await Article.find({ _id: { $in: user.appreciated } });
    const drafts = await Draft.find({ 'author._id': user._id });

    return {
        user: {
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            timestamp: user.time,
            info: user.info,
        },
        articles,
        appreciated,
        drafts,
    };
};

userSchema.statics.appreciated = async function (userId, articleId, remove) {
    if (remove) {
        await this.findOneAndUpdate(
            { _id: userId },
            { $pull: { appreciated: articleId } },
            { returnDocument: 'after' },
        );
        return;
    }

    await this.findOneAndUpdate(
        { _id: userId },
        { $push: { appreciated: articleId } },
        { returnDocument: 'after' },
    );

    return;
};

module.exports = model('User', userSchema);
