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
    user_role: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    avatar: { type: String },
    activationLink: { type: String },
    follow: [{ type: String, required: true, unique: true }],
    followers: [{ type: String, required: true, unique: true }],
    info: { country: String, city: String },
    appreciated: [{ type: String, required: true }],
    bookmarks: [{ type: String, required: true }],
    notifications: [
        {
            action_key: { type: String, required: true },
            created_on: { type: Number, default: new Date() },
            actor: {
                id: { type: String, required: true },
                username: { type: String, required: true },
                avatar: { type: String },
            },
        },
    ],
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

userSchema.statics.signupGoogle = async function (name, email, username, googleId) {
    // validation
    if (!username) {
        throw Error('Имя пользователя должно быть заполнено.');
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

    const user = await this.create({ username, email, password: hash, activationLink });

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
    const articles = await Article.find({
        $and: [{ 'author.username': username }, { isPublished: true }],
    });
    const appreciated = await Article.find({ _id: { $in: user.appreciated } });
    const bookmarks = await Article.find({ _id: { $in: user.bookmarks } });
    const drafts = await Draft.find({ 'author._id': user._id });

    return {
        user: {
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            timestamp: user.time,
            info: user.info,
            followersCount: user.followers.length,
        },
        articles,
        appreciated,
        bookmarks,
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
};

userSchema.statics.follow = async function (followerId, idolUsername) {
    const idol = await this.findOne({ username: idolUsername });
    const idolId = idol._id.toString();

    const follower = await this.findOneAndUpdate(
        { _id: followerId },
        { $push: { follow: idolId } },
        { returnDocument: 'after' },
    );

    await this.findOneAndUpdate(
        { _id: idolId },
        {
            $push: {
                followers: followerId,
                notifications: {
                    action_key: 'followuser',
                    actor: {
                        id: follower._id,
                        username: follower.username,
                        avatar: follower.avatar,
                    },
                },
            },
        },
        { returnDocument: 'after' },
    );
};

userSchema.statics.unFollow = async function (followerId, idolUsername) {
    const idol = await this.findOne({ username: idolUsername });
    const idolId = idol._id.toString();

    const follower = await this.findOneAndUpdate(
        { _id: followerId },
        { $pull: { follow: idolId } },
        { returnDocument: 'after' },
    );

    await this.findOneAndUpdate(
        { _id: idolId },
        {
            $pull: {
                followers: followerId,
                notifications: {
                    action_key: 'followuser',
                    actor: {
                        id: follower._id,
                        username: follower.username,
                        avatar: follower.avatar,
                    },
                },
            },
        },
        { returnDocument: 'after' },
    );
};

userSchema.statics.addBookmark = async function (userId, articleId) {
    await this.findOneAndUpdate(
        { _id: userId },
        { $push: { bookmarks: articleId } },
        { returnDocument: 'after' },
    );
};

userSchema.statics.removeBookmark = async function (userId, articleId) {
    await this.findOneAndUpdate(
        { _id: userId },
        { $pull: { bookmarks: articleId } },
        { returnDocument: 'after' },
    );
};

module.exports = model('User', userSchema);
