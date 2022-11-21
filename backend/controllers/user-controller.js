const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');
const User = require('../models/user-model');

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
    } catch (e) {
        res.status(400).json({ message: error.message });
    }
};

const getUser = async (req, res, next) => {
    const username = req.params.id;
    const currentUser = req.currentUser;
    try {
        const userData = await User.getUser(username);

        let isOwner = false;
        if (currentUser) {
            isOwner = userData.user._id.toString() === currentUser._id.toString() ? true : false;
        }

        return res.status(200).json({ userData, isOwner });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getUsers, getUser };
