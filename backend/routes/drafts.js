const express = require('express');

// middlewares
const compareAuthor = require('../middlewares/compareAuthor');
const requireAuth = require('../middlewares/requireAuth');
const checkUser = require('../middlewares/checkUser');

// controller functions
const { creating } = require('../controllers/draftController');

const router = express.Router();

router.post('/drafts', requireAuth, creating);

module.exports = router;
