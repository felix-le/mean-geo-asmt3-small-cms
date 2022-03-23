const express = require('express');
const router = express.Router();
const sectionRouter = require('./sectionRouter');

router.use('/', sectionRouter);

module.exports = router;
