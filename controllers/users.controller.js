const jwt = require('jsonwebtoken');
const { raiseException, responseServer } = require('../utils/response');
const { statusConstants } = require('../constants/status.constant');
const Users = require('../models/user.model');
const isEqual = require('lodash/isEqual');
// I didn't use bcrypt for password hashing because we don't have register form
const userCtrl = {
  // get data from user model
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password');

      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Get user successfully',
        user
      );
    } catch (err) {
      console.log(err);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return raiseException(
          res,
          statusConstants.BAD_REQUEST,
          'Email or password is empty'
        );
      }
      const user = await Users.findOne({ email });

      if (!user) {
        return raiseException(
          res,
          statusConstants.BAD_REQUEST_CODE,
          'User not found'
        );
      }

      const isMatch = await isEqual(password, user.password);
      if (!isMatch) {
        return raiseException(
          res,
          statusConstants.BAD_REQUEST_CODE,
          'Password is incorrect'
        );
      }

      // if login success, create access token and refresh token
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        secure: false,
      });

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Login successfully',
        accessToken
      );
    } catch (err) {
      console.log(err);
    }
  },

  refreshToken: async (req, res) => {
    try {
      const rf_token = req.body.refreshtoken;

      if (!rf_token) {
        return raiseException(
          res,
          statusConstants.BAD_REQUEST_CODE,
          'Please login'
        );
      }
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: 'Please login' });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      console.log(err);
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Log out successfully'
      );
    } catch (err) {
      return res
        .status(statusConstants.SERVER_ERROR_CODE)
        .json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
module.exports = userCtrl;
