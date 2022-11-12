const { json } = require('express');
const ArticleDto = require('../dtos/article-dto');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const articleModel = require('../models/article-model');
const userModel = require('../models/user-model');
const tokenService = require('./token-service');

class ArticleService {
    async create(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        return { userId: userData.id, username: userData.username };
    }

    async getOne(articleId) {
        const article = await articleModel.findOneAndUpdate(
            { _id: articleId },
            { $inc: { 'views.count': 1 } },
            { returnDocument: 'after' },
        );
        if (!article) {
            throw ApiError.NotFound();
        }
        const articleDto = new ArticleDto(article);
        // const authorId = articleDto.authorId;
        // const author = await userModel.findOne({ authorId });
        // console.log(author);

        return { article: articleDto };
    }

    async getOneEdit(articleId) {
        const article = await articleModel.findOne({ _id: articleId });
        const articleDto = new ArticleDto(article);
        return { article: articleDto };
    }
}

module.exports = new ArticleService();
