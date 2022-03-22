const express = require('express');
const router = express.Router();
const { statusConstants } = require('../constants/status.constant');
const userRouter = require('./users');
const projectRouter = require('./projects');

router.get('/', function (req, res, next) {
  res
    .status(statusConstants.SUCCESS_CODE)
    .json('Welcome to the MEAN PROJECT API. Lets begin');
});

router.use('/users', userRouter);
router.use('/projects', projectRouter);
module.exports = router;
