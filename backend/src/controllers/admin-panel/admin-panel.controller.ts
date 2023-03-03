import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
const jwt = require('jsonwebtoken');
import Article from '../../models/article.model';
import AdminPanelUser from '../../models/admin-panel/user.model';
import AdminTokenModel from '../../models/admin-panel/token.model';
import AdminPanelUserService from '../../service/admin-panel/user.service';
import AdminPanelTokenService from '../../service/admin-panel/token.service';

const createToken = (_id: typeof ObjectId) => {
    return jwt.sign({ _id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};
const createRefreshToken = (_id: typeof ObjectId) => {
    return jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
};

class AdminPanelController {
    public AdminPanelUserService = new AdminPanelUserService();
    public AdminPanelTokenService = new AdminPanelTokenService();

    public loginAdmin = async (req: Request, res: Response) => {
        const { login, password } = req.body;

        try {
            const user = await this.AdminPanelUserService.login(login, password);

            // create tokens
            const token = createToken(user._id);
            const refreshToken = createRefreshToken(user._id);

            // save refreshToken in db and cookies
            await this.AdminPanelTokenService.saveToken(login, refreshToken);
            res.cookie('adminPanelRefreshToken', refreshToken, {
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                httpOnly: true,
            });

            res.status(200).json({ user: login, token });
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
                const articles = await Article.find({ isPublished: false });

                const articlesLimit = await Article.find({ isPublished: false })
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
        const articleData = req.body;

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
}

export default new AdminPanelController();
