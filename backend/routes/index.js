const Router = require('express').Router;
const fileController = require('../controllers/file-controller');
const router = new Router();
const fileMiddleware = require('../middlewares/file-middleware');

router.post('/upload', fileMiddleware.single('image'), fileController.uploadFile);
router.delete('/upload', fileController.deleteFile);

module.exports = router;
