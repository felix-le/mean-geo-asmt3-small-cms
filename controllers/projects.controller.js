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

  // create new project
  createProject: async (req, res) => {
    // name, description, date, client, status, technologies, link
    try {
      const { name, description, date, client, status, technologies, link } =
        req.body;
      const newProject = new Projects({
        name,
        description,
        date,
        client,
        status,
        technologies,
        link,
      });

      await newProject.save();

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Create data successfully'
      );
    } catch (error) {
      return raiseException(res, statusConstants.BAD_REQUEST_CODE, error);
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      await Projects.findByIdAndDelete(id);

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Delete data successfully'
      );
    } catch (error) {
      return raiseException(res, statusConstants.BAD_REQUEST_CODE, error);
    }
  },
  // update project
  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, date, client, status, technologies, link } =
        req.body;
      const newProject = {
        name,
        description,
        date,
        client,
        status,
        technologies,
        link,
      };

      await Projects.findByIdAndUpdate(id, newProject);

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Update data successfully'
      );
    } catch (error) {
      return raiseException(res, statusConstants.BAD_REQUEST_CODE, error);
    }
  },
};
module.exports = projectCtrl;
