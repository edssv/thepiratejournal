import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import AuthService from '../service/auth.service';
import TokenService from '../service/token.service';
import Token from '../models/account.model';
import User from '../models/user.model';
require('dotenv').config();

class AuthController {
    public AuthService = new AuthService();
    public TokenService = new TokenService();
    public client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'postmessage');

    public login = async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        try {
            const isNewUser = (await User.findOne({ email })) === null;

            let user;
            if (isNewUser) {
                user = await this.AuthService.signup(username, email, password);
            } else user = await this.AuthService.login(email, password);

            const { accessToken, maxAge, refreshToken } = await this.TokenService.generateTokens(user._id.toString());
            const accessTokenExpiry = Date.now() + maxAge; // current date timestamp + 15 minutes

            await this.TokenService.saveToken(user._id, refreshToken);

            res.status(200).json({
                user: {
                    _id: user._id,
                    username: user.username,
                    image: user.image,
                    emailVerified: user.emailVerified,
                },
                accessToken,
                accessTokenExpiry,
                refreshToken,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public refresh = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        try {
            const user = await this.AuthService.refresh(refreshToken);

            const {
                accessToken,
                maxAge,
                refreshToken: newRefreshToken,
            } = await this.TokenService.generateTokens(user._id);
            const accessTokenExpiry = Date.now() + maxAge;

            await this.TokenService.saveToken(user._id, newRefreshToken);

            res.status(200).json({ accessToken, accessTokenExpiry, refreshToken: newRefreshToken });
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
                    image: user.image,
                    emailVerified: user.emailVerified,
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
                { username: payload?.name, image: payload?.picture, emailVerified: true },
                { upsert: true }
            );

            if (!user) return res.status(400).json({ message: 'Нет пользователя' });
            // create a token
            const { accessToken, refreshToken } = await this.TokenService.generateTokens(user._id.toString());

            // save refreshToken in db and cookies
            await this.TokenService.saveToken(user._id, refreshToken);
            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
            });

            res.status(201).json({ user, token: accessToken });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}

export default new AuthController();
