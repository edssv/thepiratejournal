import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import User from '../models/user.model';

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
    // verify authentication
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            return next();
        }

        const token = authorization.split(' ')[1];
        const { _id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        if (!_id) {
            return next();
        }

        const user = await User.findById({ _id });

        req.currentUser = user;

        next();
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = checkUser;
