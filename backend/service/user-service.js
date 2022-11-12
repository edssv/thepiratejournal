const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const articleModel = require('../models/article-model');

class UserService {
    async getUser(username) {
        const user = await UserModel.findOne({ username });
        const articles = await articleModel.find({ 'author.username': username });
        const authorDto = new UserDto(user);
        return { user: authorDto, articles: [...articles] };
    }
    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();
