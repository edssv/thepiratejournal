const Article = require('../../models/article-model');
const AdminPanelUser = require('../../models/admin-panel/user-model');
const AdminTokenModel = require('../../models/admin-panel/token-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};
const createRefreshToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
};

const loginAdmin = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await AdminPanelUser.login(login, password);

        // create tokens
        const token = createToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        // save refreshToken in db and cookies
        await AdminTokenModel.saveToken(login, refreshToken);
        res.cookie('adminPanelRefreshToken', refreshToken, {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
            httpOnly: true,
        });

        res.status(200).json({ user: login, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const { adminPanelRefreshToken } = req.cookies;
        await AdminTokenModel.deleteOne({ adminPanelRefreshToken });
        res.clearCookie('adminPanelRefreshToken');

        res.status(200).json({ message: 'Вы вышли и токен удален' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    const user = req.user;

    try {
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const refresh = async (req, res) => {
    const { adminPanelRefreshToken } = req.cookies;
    try {
        const user = await AdminPanelUser.refresh({ refreshToken: adminPanelRefreshToken });

        const token = createToken(user._id);
        const newRefreshToken = createRefreshToken(user._id);

        // save refreshToken in db and cookies
        await AdminTokenModel.saveToken(user._id, newRefreshToken);
        res.cookie('adminPanelRefreshToken', newRefreshToken, {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
            httpOnly: true,
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getArticles = async (req, res) => {
    const { limit, page } = req.query;
    const { category } = req.params;

    try {
        if (category === 'new') {
            const articles = await Article.find({ isPublished: false });
            const articlesLimit = await Article.find({ isPublished: false })
                .skip(page * limit)
                .limit(limit);

            return res.status(200).json({ articles: articlesLimit, totalCount: articles.length });
        }

        if (category === 'removed') {
            const articles = await Article.find({ isDeleted: true });
            const articlesLimit = await Article.find({ isDeleted: true })
                .skip(page * limit)
                .limit(limit);

            return res.status(200).json({ articles: articlesLimit, totalCount: articles.length });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getArticle = async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findById(articleId);

        res.status(200).json({ article });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editArticle = async (req, res) => {
    const articleId = req.params.id;
    const articleData = req.body;

    try {
        await Article.updateOne(
            { _id: articleId },
            Object.assign(articleData, { search_title: articleData.title.toLowerCase() })
        );

        res.status(200).json({ message: 'Изменения сохранены' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteArticle = async (req, res) => {
    const articleId = req.params.id;
    const articleData = req.body;

    try {
        await Article.deleteOne({ _id: articleId });

        res.status(200).json({ message: 'Статья удалена' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const publishArticle = async (req, res) => {
    const articleId = req.params.id;
    const articleData = req.body;

    try {
        await Article.updateOne(
            { _id: articleId },
            Object.assign(articleData, { search_title: articleData.title.toLowerCase() }, { isPublished: true })
        );

        res.status(200).json({ message: 'Статья опубликована' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    loginAdmin,
    logout,
    getCurrentUser,
    refresh,
    getArticles,
    getArticle,
    editArticle,
    deleteArticle,
    publishArticle,
};
