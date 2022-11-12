const jwt = require('jsonwebtoken');
const articleModel = require('../models/article-model');

class Auth {
    async checkAuth(req, res, next) {
        const token = (req.headers.authentication || '').replace(/Bearer\s?/, '');
        console.log(token);
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                req.userId = decoded._id;
                next();
            } catch (e) {
                return res.status(403).json({
                    message: 'Нет доступа',
                });
            }
        } else {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    }

    async checkAuthor(req, res, next) {
        const token = (req.headers.authentication || '').replace(/Bearer\s?/, '');
        const articleId = req.params.id;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                const article = await articleModel.findById(articleId);
                decoded._id === article.author.id;
                next();
            } catch (e) {
                return res.status(403).json({
                    message: 'Нет доступа',
                });
            }
        } else {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    }
}

module.exports = new Auth();
