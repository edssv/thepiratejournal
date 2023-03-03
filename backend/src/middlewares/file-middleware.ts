import { File } from 'buffer';
import { Request } from 'express';
const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage({
    destination: (req: Request, file: File, cb: any) => {
        if (!fs.existsSync('../media')) {
            fs.mkdirSync('../media');
        }
        cb(null, '../media');
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 8 * 1024 * 1024, // 8 MB (max file size)
    },
    fileFilter: (req: Request, file: any, cb: any) => {
        // allow images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
        }
        cb(null, true);
    },
});

module.exports = multer(upload);
