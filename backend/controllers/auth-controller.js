const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');
const tokenService = require('../service/token-service');
const authService = require('../service/auth-service');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};
const createRefreshToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
};

// signup user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.signup(username, email, password);

        // create a token
        const token = createToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        // save refreshToken in db and cookies
        await tokenModel.create({ user: user._id, refreshToken });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
        });

        res.status(200).json({ user: { username: user.username, avatar: user.avatar }, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        // save refreshToken in db and cookies
        await tokenService.saveToken(user._id, refreshToken);
        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
        });

        res.status(200).json({
            user: { _id: user._id, username: user.username, avatar: user.avatar },
            token,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
        const user = await User.refresh(refreshToken);

        const token = createToken(user._id);
        const newRefreshToken = createRefreshToken(user._id);

        // save refreshToken in db and cookies
        await tokenService.saveToken(user._id, newRefreshToken);
        res.cookie('refreshToken', newRefreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        await tokenModel.deleteOne({ refreshToken });
        res.clearCookie('refreshToken');

        res.status(200).json({ message: 'Вы вышли и токен удален' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const activate = async (req, res, next) => {
    try {
        const activationLink = req.params.link;
        await authService.activate(activationLink);
        return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
        next(e);
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            user: { id: user._id, username: user.username, avatar: user.avatar },
        });
    } catch (error) {
        res.status(401).json({ message: 'Неавторизованный запрос' });
    }
};

module.exports = { signupUser, loginUser, logout, activate, refresh, getCurrentUser };
