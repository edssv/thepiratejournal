import { Router } from 'express';
import ArticleController from '../controllers/article.controller';
// middlewares
const compareAuthor = require('../middlewares/compareAuthor');
const requireAuth = require('../middlewares/requireAuth');
const { checkLike, checkRemoveLike } = require('../middlewares/checkArticleLike');
const checkUser = require('../middlewares/checkUser');
const compareCommentAuthor = require('../middlewares/compareCommentAuthor');
const { checkCommentLike, checkRemoveCommentLike } = require('../middlewares/checkCommentLike');

const path = '/articles';
const router = Router();

router.get(`${path}/main/:section`, checkUser, ArticleController.getAll);
router.get('/search', ArticleController.search);
router.get('/search/:category', ArticleController.search);
router.post(`${path}`, requireAuth, ArticleController.creating);
router.get(`${path}/tags`, ArticleController.getLastTags);
router.get(`${path}/mostPopular`, ArticleController.getMostPopularArticle);
router.get(`${path}/authorChoice`, ArticleController.getAuthorChoice);
router.get(`${path}/bestOfWeak`, ArticleController.getBestOfWeak);
router.get(`${path}/newest`, ArticleController.getNewest);
router.delete(`${path}/:id`, requireAuth, compareAuthor, ArticleController.remove);
router.put(`${path}/:id`, requireAuth, compareAuthor, ArticleController.editing);
router.get(`${path}/:id`, checkUser, ArticleController.getOne);
router.get(`${path}/:id/comments`, checkUser, ArticleController.getComments);
router.get(`${path}/:id/next`, checkUser, ArticleController.getNext);

// like route
router.patch(`${path}/:id/like/like`, requireAuth, checkLike, ArticleController.like);
// remove like route
router.patch(`${path}/:id/like/removelike`, requireAuth, checkRemoveLike, ArticleController.removeLike);

// comments routes
router.patch(`${path}/:id/comments/add`, requireAuth, ArticleController.addComment);
router.delete(`${path}/:id/comments/remove`, requireAuth, compareCommentAuthor, ArticleController.removeComment);
router.patch(`${path}/:id/comments/:commentId/like`, requireAuth, checkCommentLike, ArticleController.likeComment);
router.patch(
    `${path}/:id/comments/:commentId/removelike`,
    requireAuth,
    checkRemoveCommentLike,
    ArticleController.removeLikeComment
);

export default router;
