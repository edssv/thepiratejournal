import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
const requireAuth = require('../middlewares/requireAuth');

const router = Router();

router.post('/login', AuthController.loginUser);
router.post('/signup', AuthController.signupUser);
router.post('/logout', AuthController.logout);
router.get('/activate/:link', AuthController.activate);
router.get('/refresh', AuthController.refresh);
router.get('/getCurrentUser', requireAuth, AuthController.getCurrentUser);
router.post('/auth/google', AuthController.googleLogin);

export default router;
