const jwt = require('jsonwebtoken');
const AdminPanelUser = require('../../models/admin-panel/user-model');

const requireAuth = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Требуется авторизационный токен' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        if (!_id) {
            return res.status(401).json({ message: 'Вы не прошли авторизацию' });
        }

        const user = await AdminPanelUser.findById({ _id });

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Неавторизованный запрос' });
    }
};

module.exports = requireAuth;
