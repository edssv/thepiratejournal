import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import User from '../../models/user.model';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
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

        const user = await User.findById({ _id });

        req.currentUser = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Неавторизованный запрос' });
    }
};

module.exports = requireAuth;
