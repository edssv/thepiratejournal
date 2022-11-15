const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        console.log(file);
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
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
