const Projects = require('../models/projects.model');
const { raiseException, responseServer } = require('../utils/response');
const { statusConstants } = require('../constants/status.constant');

const projectCtrl = {
  getAllProjects: async (req, res) => {
    try {
      const allproject = await Projects.find();

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Get data successfully',
        allproject
      );
    } catch (error) {
      return raiseException(res, statusConstants.BAD_REQUEST_CODE, error);
    }
  },
};
module.exports = projectCtrl;
