const express = require('express');
const router = express.Router();
const userCtrl = require('../../controllers/users.controller');
const auth = require('../../middleware/auth');

router.get('/infor', userCtrl.getUser);

router.post('/login', userCtrl.login);

router.post('/logout', userCtrl.logout);

// refresh_token
router.get('/refresh_token', userCtrl.refreshToken);

module.exports = router;
