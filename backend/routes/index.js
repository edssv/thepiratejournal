const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const fileController = require('../controllers/file-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');
const fileMiddleware = require('../middlewares/file-middleware');

router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:id', userController.getUser);

router.post('/upload', fileMiddleware.single('image'), fileController.uploadFile);
router.delete('/upload', fileController.deleteFile);

module.exports = router;
