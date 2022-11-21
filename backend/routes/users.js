const express = require('express');

const { getUsers, getUser } = require('../controllers/user-controller');
const checkUser = require('../middlewares/checkUser');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', checkUser, getUser);

module.exports = router;
