const jwt = require('jsonwebtoken');
import { ObjectId } from 'mongodb';
import tokenModel from '../models/token.model';

export default class TokenService {
    public async generateTokens(_id: string) {
        const token = jwt.sign({ _id }, process.env.JWT_ACCESS_SECRET, { expiresIn: 15 * 60 * 1000 });
        const refreshToken = jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: 30 * 24 * 60 * 60 * 1000,
        });

        return {
            token,
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
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await tokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken: string) {
        const tokenData = await tokenModel.findOne({ refreshToken });
        return tokenData;
    }
}
