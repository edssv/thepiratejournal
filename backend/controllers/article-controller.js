const articleModel = require('../models/article-model');
const articleService = require('../service/article-service');

class ArticleController {
    async create(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const user = await articleService.create(refreshToken);
            const doc = new articleModel({
                author: { id: user.userId, userName: user.userName },
                cover: req.body.cover,
                blocks: req.body.blocks,
                timestamp: req.body.time,
            });

            const article = await doc.save();

            res.json(article);
        } catch (err) {
            res.status(500).json({
                message: 'Не удалось создать статью',
            });
        }
    }

    async getAll(req, res, next) {
        try {
            const articles = await articleModel.find().exec();
            return res.json(articles);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const articleId = req.params.id;
            const article = await articleService.getOne(articleId);
            res.json(article);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ArticleController();
