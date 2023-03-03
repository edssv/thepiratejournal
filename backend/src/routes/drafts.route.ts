import { Router } from 'express';
import DraftController from '../controllers/draft.controller';
const requireAuth = require('../middlewares/requireAuth');

const router = Router();

router.post('/drafts', requireAuth, DraftController.creating);
router.get('/drafts/:_id', requireAuth, DraftController.getOne);

export default router;
