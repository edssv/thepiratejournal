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
    addComment,
    removeComment,
    getComments,
    getSuggestions,
    likeComment,
    removeLikeComment,
} = require('../controllers/article-controller');
const compareAuthor = require('../middlewares/compareAuthor');
const requireAuth = require('../middlewares/requireAuth');
const { checkLike, checkRemoveLike } = require('../middlewares/checkArticleLike');
const checkUser = require('../middlewares/checkUser');
const compareCommentAuthor = require('../middlewares/compareCommentAuthor');
const { checkCommentLike, checkRemoveCommentLike } = require('../middlewares/checkCommentLike');

const router = express.Router();

router.get('/articles/main/:section', checkUser, getAll);
router.get('/search', searchArticles);
router.get('/search/:category', searchArticles);
router.get('/articles/:id', checkUser, getOne);
router.get('/articles/:id/comments', checkUser, getComments);
router.get('/articles/:id/suggestions/:category', checkUser, getSuggestions);
router.get('/articles/edit/:id', checkUser, getOne);
router.post('/articles', requireAuth, creating);
router.delete('/articles/:id', requireAuth, compareAuthor, remove);
router.put('/articles/:id', requireAuth, compareAuthor, editing);

// like route
router.patch('/articles/:id/like/like', requireAuth, checkLike, like);
// remove like route
router.patch('/articles/:id/like/removelike', requireAuth, checkRemoveLike, removeLike);

// comments routes
router.patch('/articles/:id/comments/add', requireAuth, addComment);
router.delete('/articles/:id/comments/remove', requireAuth, compareCommentAuthor, removeComment);
router.patch('/articles/:id/comments/:commentId/like', requireAuth, checkCommentLike, likeComment);
router.patch(
    '/articles/:id/comments/:commentId/removelike',
    requireAuth,
    checkRemoveCommentLike,
    removeLikeComment,
);

module.exports = router;
