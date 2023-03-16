import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
import User from '../models/user.model';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(403).json({ message: 'Требуется авторизационный токен' });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (error: ErrorEventInit, decoded: JwtPayload) => {
        if (error) {
            return res.status(401).json({ message: 'Неавторизованный запрос' });
        }

        const user = await User.findById(decoded._id);

        req.currentUser = user;

        next();
    });
};

module.exports = requireAuth;
