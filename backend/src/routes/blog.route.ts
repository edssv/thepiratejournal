import { Router } from 'express';
import BlogController from '../controllers/blog.controller';
// middlewares
const compareAuthor = require('../middlewares/compareAuthor');
const requireAuth = require('../middlewares/requireAuth');
const { checkLike, checkRemoveLike } = require('../middlewares/checkArticleLike');
const checkUser = require('../middlewares/checkUser');
const compareCommentAuthor = require('../middlewares/compareCommentAuthor');
const { checkCommentLike, checkRemoveCommentLike } = require('../middlewares/checkCommentLike');

const path = '/blog';
const router = Router();

router.get(`${path}`, checkUser, BlogController.getAll);
router.get(`${path}/:id`, checkUser, BlogController.getOne);

export default router;
