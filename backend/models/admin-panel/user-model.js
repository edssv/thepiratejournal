const { Schema, model } = require('mongoose');
const AdminTokenModel = require('./token-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminPanelUserSchema = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

AdminPanelUserSchema.statics.login = async function (login, password) {
    if (!login || !password) {
        throw Error('Все поля должны быть заполнены');
    }

    const user = await this.findOne({ login: login });

    if (!user) {
        throw Error('Неверный адрес электронной почты');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Неверный пароль');
    }

    return user;
};

AdminPanelUserSchema.statics.refresh = async function ({ refreshToken }) {
    if (!refreshToken) {
        throw Error('Рефреш токен отсутствует');
    }

    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const refreshTokenFromDb = await AdminTokenModel.findOne({ refreshToken });

    if (!refreshTokenFromDb) {
        throw Error('Неверный рефреш токен');
    }

    return user;
};

module.exports = model('AdminPanelUser', AdminPanelUserSchema);
