const jwt = require('jsonwebtoken');
import { ObjectId } from 'mongodb';
import Account from '../models/account.model';

export default class TokenService {
    public async generateTokens(_id: string) {
        const maxAge = 2 * 60 * 1000; // 15 minutes
        const accessToken = jwt.sign({ sub: _id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '2m' });
        const refreshToken = jwt.sign({ sub: _id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d',
        });

        return {
            accessToken,
            maxAge,
            refreshToken,
        };
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }
    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: string | typeof ObjectId, refreshToken: string) {
        const tokenData = await Account.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await Account.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await Account.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken: string) {
        const tokenData = await Account.findOne({ refreshToken });
        return tokenData;
    }
}
