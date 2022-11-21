const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const checkUser = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            return next();
        }

        const token = authorization.split(' ')[1];
        const { _id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        const user = await User.findById({ _id });

        req.currentUser = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = checkUser;
