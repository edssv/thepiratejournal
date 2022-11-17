const Article = require('../models/article-model');
const articleService = require('../service/article-service');
const User = require('../models/user-model');

class ArticleController {
    async creating(req, res) {
        const authorId = req.user._id;
        const authorUsername = req.user.username;
        const { title, cover, blocks, time } = req.body;
        try {
            const article = await Article.creating(
                authorId,
                authorUsername,
                title,
                cover,
                blocks,
                time,
            );

            res.json(article);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async remove(req, res, next) {
        try {
            const articleId = req.params.id;
            await Article.findOneAndDelete({ _id: articleId });
            res.json({
                message: 'Статья удалена',
            });
        } catch (e) {
            next(e);
        }
    }
    async editing(req, res, next) {
        const articleId = req.params.id;
        const { title, cover, blocks } = req.body;
        try {
            await Article.editing(articleId, title, cover, blocks);
            res.status(200).json({ message: 'Статья обновлена' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req, res, next) {
        try {
            const articles = await Article.find().exec();
            return res.json(articles);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res) {
        const id = req.params.id;

        try {
            const article = await Article.getOne(id);

            const user = await User.findById(article.author._id);

            if (!user) return res.status(200).json({ article, message: 'Автор статьи не найден' });

            res.status(200).json({
                article,
                user: { _id: user._id, username: user.username, avatar: user.avatar },
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOneEdit(req, res, next) {
        try {
            const articleId = req.params.id;
            const article = await articleService.getOneEdit(articleId);
            res.json(article);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ArticleController();
