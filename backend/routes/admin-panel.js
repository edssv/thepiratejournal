const express = require('express');
const fileMiddleware = require('../middlewares/file-middleware');

//middlewares
const requireAuth = require('../middlewares/admin-panel/requireAuth');

// controller functions
const {
    loginAdmin,
    getCurrentUser,
    getArticles,
    getArticle,
    editArticle,
    publishArticle,
    refresh,
    logout,
    deleteArticle,
} = require('../controllers/admin-panel/admin-panel-controller');
const { uploadFile, deleteFile } = require('../controllers/admin-panel/file-controller');

const router = express.Router();

// login route
router.post('/login', loginAdmin);

// logout route
router.post('/logout', logout);

// get current user route
router.get('/auth', requireAuth, getCurrentUser);

// refresh token route
router.get('/refresh', refresh);

// article routes
router.get('/articles/category/:category', requireAuth, getArticles);
router.get('/articles/:id', requireAuth, getArticle);
router.put('/articles/:id/edit', requireAuth, editArticle);
router.delete('/articles/:id', requireAuth, deleteArticle);
router.put('/articles/:id', requireAuth, publishArticle);

// article images
router.post('/upload', fileMiddleware.single('image'), uploadFile);
router.delete('/upload', deleteFile);

module.exports = router;
