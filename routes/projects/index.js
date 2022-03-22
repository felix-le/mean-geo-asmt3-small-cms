const express = require('express');
const router = express.Router();
const projectRoutes = require('./projectRouter');

router.use('/', projectRoutes);

module.exports = router;
