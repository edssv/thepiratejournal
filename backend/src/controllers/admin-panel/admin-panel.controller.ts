import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { OAuth2Client } from 'google-auth-library';
const jwt = require('jsonwebtoken');
import Article from '../../models/article.model';
import AdminPanelUserService from '../../service/admin-panel/user.service';
import AdminTokenModel from '../../models/admin-panel/token.model';
import AuthService from '../../service/auth.service';
import AdminPanelTokenService from '../../service/admin-panel/token.service';
import Blog from '../../models/blog.model';
import BlogService from '../../service/blog.service';
import User from '../../models/user.model';
require('dotenv').config();

const createToken = (_id: typeof ObjectId) => {
    return jwt.sign({ _id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};
const createRefreshToken = (_id: typeof ObjectId) => {
    return jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
};

class AdminPanelController {
    public AuthService = new AuthService();
    public AdminPanelTokenService = new AdminPanelTokenService();
    public AdminPanelUserService = new AdminPanelUserService();
    public BlogService = new BlogService();
    public client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'postmessage');

    public loginAdmin = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const user = await this.AuthService.login(email, password);

            if (user.role !== 'admin') {
                return res.status(400).json({ message: 'Вы не являетесь администратором' });
            }

            // create tokens
            const token = createToken(user._id);
            const refreshToken = createRefreshToken(user._id);

            // save refreshToken in db and cookies
            await this.AdminPanelTokenService.saveToken(String(user._id), refreshToken);
            res.cookie('adminPanelRefreshToken', refreshToken, {
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                httpOnly: true,
            });

            res.status(200).json({ user, token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public googleLogin = async (req: Request, res: Response) => {
        const code = req.body.code;

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

            const payload = ticket?.getPayload();

            const user = await User.findOne({ email: payload?.email });

            if (!user) return res.status(400).json({ message: 'Нет пользователя' });

            if (user.role !== 'admin') return res.status(400).json({ message: 'Вы не являетесь администратором' });

            // create tokens
            const token = createToken(user._id);
            const refreshToken = createRefreshToken(user._id);

            // save refreshToken in db and cookies
            await this.AdminPanelTokenService.saveToken(String(user._id), refreshToken);
            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
            });

            res.status(201).json({ user, token: token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public logout = async (req: Request, res: Response) => {
        try {
            const { adminPanelRefreshToken } = req.cookies;
            await AdminTokenModel.deleteOne({ adminPanelRefreshToken });
            res.clearCookie('adminPanelRefreshToken');

            res.status(200).json({ message: 'Вы вышли и токен удален' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getCurrentUser = async (req: Request, res: Response) => {
        const user = req.currentUser;

        try {
            res.status(200).json({ user });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public refresh = async (req: Request, res: Response) => {
        const { adminPanelRefreshToken } = req.cookies;
        try {
            const user = await this.AdminPanelUserService.refresh(adminPanelRefreshToken);

            const token = createToken(user._id);
            const newRefreshToken = createRefreshToken(user._id);

            // save refreshToken in db and cookies
            await this.AdminPanelTokenService.saveToken(user._id, newRefreshToken);
            res.cookie('adminPanelRefreshToken', newRefreshToken, {
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                httpOnly: true,
            });

            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getArticles = async (req: Request, res: Response) => {
        const { limit, page } = req.query;
        const { category } = req.params;

        try {
            if (category === 'new') {
                const articles = await Article.find({ $and: [{ isPublished: true }, { isDeleted: undefined }] });

                const articlesLimit = await Article.find({ $and: [{ isPublished: false }, { isDeleted: undefined }] })
                    .skip(Number(page) * Number(limit))
                    .limit(Number(limit));

                return res.status(200).json({ articles: articlesLimit, totalCount: articles.length });
            }

            if (category === 'removed') {
                const articles = await Article.find({ isDeleted: true });
                const articlesLimit = await Article.find({ isDeleted: true })
                    .skip(Number(page) * Number(limit))
                    .limit(Number(limit));

                return res.status(200).json({ articles: articlesLimit, totalCount: articles.length });
            }

            if (category === 'blog') {
                const articles = await Blog.find();

                const articlesLimit = await Blog.find()
                    .skip(Number(page) * Number(limit))
                    .limit(Number(limit));

                return res.status(200).json({ articles: articlesLimit, totalCount: articles.length });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getArticle = async (req: Request, res: Response) => {
        const articleId = req.params.id;

        try {
            const article = await Article.findById(articleId);

            res.status(200).json({ article });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public editArticle = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const articleData = req.body;

        try {
            await Article.updateOne(
                { _id: articleId },
                Object.assign(articleData, { searchTitle: articleData.title.toLowerCase() })
            );

            res.status(200).json({ message: 'Изменения сохранены' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public deleteArticle = async (req: Request, res: Response) => {
        const articleId = req.params.id;

        try {
            await Article.deleteOne({ _id: articleId });

            res.status(200).json({ message: 'Статья удалена' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public publishArticle = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const articleData = req.body;

        try {
            await Article.updateOne(
                { _id: articleId },
                Object.assign(articleData, { searchTitle: articleData.title.toLowerCase() }, { isPublished: true })
            );

            res.status(200).json({ message: 'Статья опубликована' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public publishBlog = async (req: Request, res: Response) => {
        const authorId = req.currentUser._id;
        const authorUsername = req.currentUser.username;
        const articleData = req.body;

        try {
            if (articleData._id) {
                await Article.updateOne(
                    { _id: articleData._id },
                    Object.assign(articleData, { searchTitle: articleData.title.toLowerCase() }, { isPublished: true })
                );

                return res.status(200).json({ message: 'Статья опубликована в блог' });
            }
            await this.BlogService.createArticle(authorId, authorUsername, articleData);

            res.status(200).json({ message: 'Статья опубликована в блог' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public editBlog = async (req: Request, res: Response) => {
        const articleId = req.params.id;
        const { title, description, cover, blocks, tags, category, readingTime } = req.body;

        try {
            await this.BlogService.editArticle(
                articleId,
                title,
                description,
                cover,
                blocks,
                tags,
                category,
                readingTime
            );
            res.status(200).json({ message: 'Статья обновлена' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public saveBlog = async (req: Request, res: Response) => {
        const authorId = req.currentUser._id;
        const authorUsername = req.currentUser.username;
        const articleData = req.body;

        try {
            await this.BlogService.saveChanges(authorId, authorUsername, articleData);

            res.status(200).json({ message: 'Изменения сохранены' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public deleteBlog = async (req: Request, res: Response) => {
        const articleId = req.params.id;

        try {
            await Blog.deleteOne({ _id: articleId });

            res.status(200).json({ message: 'Статья удалена' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getBlog = async (req: Request, res: Response) => {
        const articleId = req.params.id;

        try {
            const article = await Blog.findById(articleId);

            res.status(200).json({ article });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}

export default new AdminPanelController();
