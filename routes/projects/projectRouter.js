const express = require('express');
const router = express.Router();
const projectCtrl = require('../../controllers/projects.controller');
const auth = require('../../middleware/auth');

router.get('/', projectCtrl.getAllProjects);

router.post('/create', projectCtrl.createProject);

router.delete('/:id/delete', projectCtrl.deleteProject);

// updated project
router.put('/:id/update', projectCtrl.updateProject);

// // refresh_token
// router.get('/refresh_token', userCtrl.refreshToken);

module.exports = router;
