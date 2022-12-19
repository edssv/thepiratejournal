const express = require('express');
const { uploadFile, deleteFile, uploadAvatar } = require('../controllers/file-controller');
const checkUser = require('../middlewares/checkUser');
const fileMiddleware = require('../middlewares/file-middleware');

// controller functions

const router = express.Router();

// article images
router.post('/upload', fileMiddleware.single('image'), uploadFile);
router.delete('/upload', deleteFile);

// profile avatar
router.post('/profile/avatar', fileMiddleware.single('image'), checkUser, uploadAvatar);

module.exports = router;
