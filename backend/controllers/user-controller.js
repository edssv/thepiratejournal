const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUser(req, res, next) {
        try {
            const username = req.params.id;
            const userData = await userService.getUser(username);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
