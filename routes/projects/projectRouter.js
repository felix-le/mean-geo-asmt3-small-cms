const express = require('express');
const router = express.Router();
const projectCtrl = require('../../controllers/projects.controller');
const auth = require('../../middleware/auth');

router.get('/', projectCtrl.getAllProjects);

// router.post('/login', userCtrl.login);

// router.post('/logout', userCtrl.logout);

// // refresh_token
// router.get('/refresh_token', userCtrl.refreshToken);

module.exports = router;
