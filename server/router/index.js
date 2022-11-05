const Router = require('express').Router;
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');
const articleController = require('../controllers/article-controller');
const fileController = require('../controllers/file-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const fileMiddleware = require('../middlewares/file-middleware');

router.post(
    '/signup',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    authController.registration,
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:id', userController.getUser);

router.post(
    '/upload',
    fileMiddleware.fields([{ name: 'image' }, { name: 'cover' }, { name: 'avatar' }]),
    fileController.uploadFile,
);
router.delete('/upload', fileController.deleteFile);
router.get('/articles', articleController.getAll);
router.get('/articles/:id', articleController.getOne);
router.post('/articles', articleController.create);

module.exports = router;
