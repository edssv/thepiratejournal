import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const validator = require('validator');
import MailService from '../service/mail.service';
import Token from '../models/account.model';
import User from '../models/user.model';

export default class AuthService {
    public MailService = new MailService();

    async signup(username: string, email: string, password: string) {
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
        const existUsername = await User.findOne({ username });
        const existEmail = await User.findOne({ email });

        if (existUsername) {
            throw Error('Данное имя пользователя уже занято');
        }

        if (existEmail) {
            throw Error('Учетная запись с данным адресом электронной почты уже существует');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const activation_link = uuid.v4();

        const user = await User.create({ username, email, password: hash, activation_link });

        await this.MailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activation_link}`);

        return user;
    }

    async login(email: string, password: string) {
        if (!email || !password) {
            throw Error('Все поля должны быть заполнены');
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw Error('Неверный адрес электронной почты');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw Error('Неверный пароль');
        }

        return user;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw Error('Рефреш токен отсутствует');
        }

        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const refreshTokenFromDb = await Token.findOne({ refreshToken });

        if (!refreshTokenFromDb) {
            throw Error('Неверный рефреш токен');
        }

        return user;
    }

    async activate(activation_link: string) {
        const user = await User.findOne({ activation_link });
        if (!user) {
            throw Error('Неккоректная ссылка активации');
        }
        user.emailVerified = true;
        await user.save();
    }
}
