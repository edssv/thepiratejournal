const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');
const User = require('../models/user-model');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (e) {
        res.status(400).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    const username = req.params.id;
    const currentUser = req.currentUser;
    try {
        const { user, articles, appreciated, drafts } = await User.getUser(username);

        let isOwner = false;
        if (currentUser) {
            isOwner = user._id.toString() === currentUser._id.toString() ? true : false;
        }

        if (isOwner) return res.status(200).json({ user, articles, appreciated, drafts, isOwner });

        res.status(200).json({ user, articles, appreciated });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getUsers, getUser };
