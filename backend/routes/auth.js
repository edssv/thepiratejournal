const express = require('express');

// controller functions
const {
    signupUser,
    loginUser,
    logout,
    activate,
    refresh,
    getCurrentUser,
} = require('../controllers/auth-controller');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// logout route
router.post('/logout', logout);

// activate account route
router.get('/activate/:link', activate);

// refresh access token route
router.get('/refresh', refresh);

// getCurrenetUser route
router.get('/getCurrentUser', requireAuth, getCurrentUser);

module.exports = router;