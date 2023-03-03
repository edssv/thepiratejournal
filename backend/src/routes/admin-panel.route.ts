import { Router } from 'express';
import AdminPanelController from '../controllers/admin-panel/admin-panel.controller';
import AdminPanelFileController from '../controllers/admin-panel/file.controller';
const fileMiddleware = require('../middlewares/file-middleware');
const requireAuth = require('../middlewares/admin-panel/requireAuth');

const router = Router();

// auth routes
router.post('/login', AdminPanelController.loginAdmin);
router.post('/logout', AdminPanelController.logout);
router.get('/auth', requireAuth, AdminPanelController.getCurrentUser);
router.get('/refresh', AdminPanelController.refresh);

// article routes
router.get('/articles/category/:category', requireAuth, AdminPanelController.getArticles);
router.get('/articles/:id', requireAuth, AdminPanelController.getArticle);
router.put('/articles/:id/edit', requireAuth, AdminPanelController.editArticle);
router.delete('/articles/:id', requireAuth, AdminPanelController.deleteArticle);
router.put('/articles/:id', requireAuth, AdminPanelController.publishArticle);

// article images
router.post('/upload', fileMiddleware.single('image'), AdminPanelFileController.uploadFile);
router.delete('/upload', AdminPanelFileController.deleteFile);

export default router;
