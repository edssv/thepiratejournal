const express = require('express');

const { getUsers, getUser, follow, unFollow } = require('../controllers/user-controller');
const { checkFollow, checkUnFollow } = require('../middlewares/checkFollow');
const checkUser = require('../middlewares/checkUser');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:username', checkUser, getUser);
router.post('/users/:username/followers', requireAuth, checkFollow, follow);
router.delete('/users/:username/followers', requireAuth, checkUnFollow, unFollow);

module.exports = router;
