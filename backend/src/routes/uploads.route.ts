import { Router } from 'express';
import FileController from '../controllers/file.controller';
const checkUser = require('../middlewares/checkUser');
const fileMiddleware = require('../middlewares/file-middleware');

const router = Router();

router.post('/upload', fileMiddleware.single('image'), FileController.uploadFile);
router.delete('/upload', FileController.deleteFile);

// profile image
router.post('/profile/image', fileMiddleware.single('image'), checkUser, FileController.uploadimage);

export default router;
