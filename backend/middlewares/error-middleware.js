const ApiError = require('../exceptions/api-error');
const multer = require('multer');

module.exports = function (error, req, res, next) {
    console.log(error);
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message, errors: error.errors });
    }

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
};
