import { Router } from 'express';
import UserController from '../controllers/user.controller';
const { checkFollow, checkUnFollow } = require('../middlewares/checkFollow');
const checkUser = require('../middlewares/checkUser');
const requireAuth = require('../middlewares/requireAuth');

const router = Router();
const Controller = new UserController();

router.get('/users/:username/:category', checkUser, Controller.getUser);

// follow routes
router.post('/users/:username/followers', requireAuth, checkFollow, Controller.follow);
router.delete('/users/:username/followers', requireAuth, checkUnFollow, Controller.unFollow);

//bookmark routes
router.post('/bookmarks/:id', requireAuth, Controller.bookmark);
router.delete('/bookmarks/:id', requireAuth, Controller.bookmark);

//notifications routes
router.get('/notifications', requireAuth, Controller.getNotifications);
router.delete('/notifications/:id', requireAuth, Controller.deleteNotification);

export default router;
