const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'cover') {
            cb(null, 'uploads/covers');
        }
        if (file.fieldname === 'avatar') {
            cb(null, 'uploads/avatars');
        } else {
            cb(null, 'uploads');
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 4 * 1024 * 1024, // 4 MB (max file size)
    },
    fileFilter: (req, file, cb) => {
        // allow images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
        }
        cb(null, true);
    },
});

module.exports = multer(upload);
