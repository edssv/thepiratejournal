import { Router } from 'express';
import FileController from '../controllers/file.controller';
const checkUser = require('../middlewares/checkUser');
const fileMiddleware = require('../middlewares/file-middleware');

const router = Router();

router.post('/upload', fileMiddleware.single('image'), FileController.uploadFile);
router.delete('/upload', FileController.deleteFile);

// profile avatar
router.post('/profile/avatar', fileMiddleware.single('image'), checkUser, FileController.uploadAvatar);

export default router;
