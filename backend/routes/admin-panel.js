const express = require('express');

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
} = require('../controllers/admin-panel-controller');

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
router.get('/articles', requireAuth, getArticles);
router.get('/articles/:id', requireAuth, getArticle);
router.put('/articles/:id/edit', requireAuth, editArticle);
router.put('/articles/:id', requireAuth, publishArticle);

module.exports = router;
