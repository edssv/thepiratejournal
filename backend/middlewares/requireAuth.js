const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const requireAuth = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Требуется авторизационный токен' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        const user = await User.findById({ _id });

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Неавторизованный запрос' });
    }
};

module.exports = requireAuth;
