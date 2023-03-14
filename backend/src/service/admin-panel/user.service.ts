const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import User from '../../models/admin-panel/user.model';
import Token from '../../models/admin-panel/token.model';

export default class AdminPanelUserService {
    public async login(login: string, password: string) {
        if (!login || !password) {
            throw Error('Все поля должны быть заполнены');
        }

        const user = await User.findOne({ login: login });

        if (!user) {
            throw Error('Неверный адрес электронной почты');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw Error('Неверный пароль');
        }

        return user;
    }

    public async refresh(controlRefreshToken: string) {
        if (!controlRefreshToken) {
            throw Error('Рефреш токен отсутствует');
        }

        const user = jwt.verify(controlRefreshToken, process.env.JWT_REFRESH_SECRET);
        const refreshTokenFromDb = await Token.findOne({ refreshToken: controlRefreshToken });

        if (!refreshTokenFromDb) {
            throw Error('Неверный рефреш токен');
        }

        return user;
    }
}
