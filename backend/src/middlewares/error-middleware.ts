import { NextFunction, Request, Response } from 'express';
const multer = require('multer');

export default function (error: any, req: Request, res: Response, next: NextFunction) {
    //upload
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'Можно загрузить файл меньше 4 МБ',
            });
        }

        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                message: 'File limit reached',
            });
        }

        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                message: 'Можно загрузить только изображение',
            });
        }
    }

    return res.status(500).json({ message: 'Что-то пошло не так' });
}
