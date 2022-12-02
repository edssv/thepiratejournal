const express = require('express');

// controller functions
const {
    creating,
    remove,
    editing,
    getOne,
    getAll,
    like,
    removeLike,
    searchArticles,
} = require('../controllers/article-controller');
const compareAuthor = require('../middlewares/compareAuthor');
const requireAuth = require('../middlewares/requireAuth');
const { checkLike, checkRemoveLike } = require('../middlewares/checkLike');
const checkUser = require('../middlewares/checkUser');

const router = express.Router();

router.get('/articles/main/:section', checkUser, getAll);
router.get('/search', searchArticles);
router.get('/search/:category', searchArticles);
router.get('/articles/:id', checkUser, getOne);
router.post('/articles', requireAuth, creating);
router.delete('/articles/:id', requireAuth, compareAuthor, remove);
router.put('/articles/:id', requireAuth, compareAuthor, editing);

// like route
router.patch('/articles/:id/like/like', requireAuth, checkLike, like);
// remove like route
router.patch('/articles/:id/like/removelike', requireAuth, checkRemoveLike, removeLike);

module.exports = router;
