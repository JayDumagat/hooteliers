const express = require('express');
const router = express.Router();

const {createUser, loginUser, checkAuth, logoutUser} = require('../controllers/authController');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/session', checkAuth);
router.post('/logout', logoutUser);

module.exports = router;