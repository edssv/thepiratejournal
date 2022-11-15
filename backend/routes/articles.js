const express = require('express');

// controller functions
const articleController = require('../controllers/article-controller');
const compareAuthor = require('../middlewares/compareAuthor');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.get('/articles', articleController.getAll);
router.get('/articles/:id', articleController.getOne);
router.post('/articles', requireAuth, articleController.creating);
router.delete('/articles/:id', requireAuth, articleController.remove);
router.get('/articles/:id/edit', articleController.getOneEdit);
router.patch('/articles/:id/edit', requireAuth, compareAuthor, articleController.editing);

module.exports = router;
