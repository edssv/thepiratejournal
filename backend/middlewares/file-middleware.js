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
        cb(null, Date.now() + '-' + file.originalname);
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
            return cb(new Error('Only image are allowed.'), false);
        }
        cb(null, true);
    },
});

module.exports = multer(upload);
