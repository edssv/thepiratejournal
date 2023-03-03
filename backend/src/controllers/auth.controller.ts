import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import AuthService from '../service/auth.service';
import TokenService from '../service/token.service';
import Token from '../models/token.model';
import User from '../models/user.model';
require('dotenv').config();

class AuthController {
    public AuthService = new AuthService();
    public TokenService = new TokenService();
    public client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'postmessage');

    public signupUser = async (req: Request, res: Response) => {
        const { username, email, password } = req.body;
        try {
            const user = await this.AuthService.signup(username, email, password);

            const { token, refreshToken } = await this.TokenService.generateTokens(user._id.toString());

            // save refreshToken in db and cookies
            await Token.create({ user: user._id, refreshToken });
            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
            });

            res.status(200).json({
                user: { username: user.username, avatar: user.avatar, isActivated: user.isActivated },
                token,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const user = await this.AuthService.login(email, password);

            const { token, refreshToken } = await this.TokenService.generateTokens(user._id.toString());

            // save refreshToken in db and cookies
            await this.TokenService.saveToken(user._id, refreshToken);
            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
            });

            res.status(200).json({
                user: {
                    _id: user._id,
                    username: user.username,
                    avatar: user.avatar,
                    isActivated: user.isActivated,
                },
                token,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public refresh = async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies;

        try {
            const user = await this.AuthService.refresh(refreshToken);

            const { token, refreshToken: newRefreshToken } = await this.TokenService.generateTokens(user._id);

            // save refreshToken in db and cookies
            await this.TokenService.saveToken(user._id, newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public logout = async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.cookies;
            await Token.deleteOne({ refreshToken });
            res.clearCookie('refreshToken');

            res.status(200).json({ message: 'Вы вышли и токен удален' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public activate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const activation_link = req.params.link;
            await this.AuthService.activate(activation_link);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    };

    public getCurrentUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findById(req.currentUser._id);

            if (!user) return res.status(400).json({ message: 'Нет пользователя' });

            res.status(200).json({
                user: {
                    id: user._id,
                    username: user.username,
                    avatar: user.avatar,
                    isActivated: user.isActivated,
                    notifications: { totalCount: user.notifications.length },
                },
            });
        } catch (error) {
            res.status(401).json({ message: 'Неавторизованный запрос' });
        }
    };

    public googleLogin = async (req: Request, res: Response) => {
        const code = req.body.code;
        const credential = req.body.credential;

        if (!req.body) return res.status(400).json({ message: 'Отсутствует код' });

        try {
            let ticket;

            if (code) {
                const { tokens } = await this.client.getToken(code);

                ticket = await this.client.verifyIdToken({
                    idToken: tokens.id_token ?? '',
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
            }

            if (credential) {
                ticket = await this.client.verifyIdToken({
                    idToken: credential,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
            }

            const payload = ticket?.getPayload();

            const user = await User.findOneAndUpdate(
                { email: payload?.email },
                { username: payload?.name, avatar: payload?.picture, isActivated: true },
                { upsert: true }
            );

            if (!user) return res.status(400).json({ message: 'Нет пользователя' });
            // create a token
            const { token, refreshToken } = await this.TokenService.generateTokens(user._id.toString());

            // save refreshToken in db and cookies
            await this.TokenService.saveToken(user._id, refreshToken);
            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
            });

            res.status(201).json({ user, token: token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}

export default new AuthController();
