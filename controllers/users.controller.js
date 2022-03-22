const jwt = require('jsonwebtoken');
const { raiseException, responseServer } = require('../utils/response');
const { statusConstants } = require('../constants/status.constant');
const mockData = {
  id: 1,
  username: 'test',
  password: 'test',
};

const userCtrl = {
  // get data from user model
  getUser: async (req, res) => {
    try {
      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Get data successfully',
        mockData
      );
    } catch (err) {
      console.log(err);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return raiseException(
          res,
          statusConstants.BAD_REQUEST_CODE,
          'Please enter username and password'
        );
      }
      // compare with mock data
      if (username === mockData.username && password === mockData.password) {
        const accesstoken = createAccessToken({ id: username.id });
        const refreshtoken = createRefreshToken({ id: username.id });

        res.cookie('refreshtoken', refreshtoken, {
          httpOnly: true,
          path: '/user/refresh_token',
          sameSite: 'None',
          Secure: true,
        });

        res.json({ accesstoken });
      } else {
        // wrong username or password
        return raiseException(
          res,
          statusConstants.UNAUTHORIZED_CODE,
          'Wrong username or password'
        );
      }
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
          'Pleaselogin'
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
