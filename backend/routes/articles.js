const express = require('express');

// controller functions
const {
    creating,
    remove,
    editing,
    getOne,
    getAll,
    getOneEdit,
    like,
    removeLike,
} = require('../controllers/article-controller');
const compareAuthor = require('../middlewares/compareAuthor');
const requireAuth = require('../middlewares/requireAuth');
const { checkLike, checkRemoveLike } = require('../middlewares/checkLike');
const checkUser = require('../middlewares/checkUser');

const router = express.Router();

router.get('/articles', getAll);
router.get('/articles/:id', checkUser, getOne);
router.post('/articles', requireAuth, creating);
router.delete('/articles/:id', requireAuth, remove);
router.get('/articles/:id/edit', getOneEdit);
router.patch('/articles/:id', requireAuth, compareAuthor, editing);

// like route
router.patch('/articles/:id/like/like', requireAuth, checkLike, like);
// remove like route
router.patch('/articles/:id/like/removelike', requireAuth, checkRemoveLike, removeLike);

module.exports = router;
