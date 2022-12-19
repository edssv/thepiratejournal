const UserModel = require('../models/user-model');
const articleModel = require('../models/article-model');

class UserService {
    async getUser(username) {
        const user = await UserModel.findOne({ username });
        const articles = await articleModel.find({ 'author.username': username });

        return {
            user: {
                id: user._id,
                username: user.username,
                avatar: user.avatar,
                timestamp: user.time,
                info: user.info,
            },
            articles: [...articles],
        };
    }
    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();
