const Section = require('../models/section.model');
const { raiseException, responseServer } = require('../utils/response');
const { statusConstants } = require('../constants/status.constant');

const sectionCtrl = {
  getAllSection: async (req, res) => {
    try {
      const allSection = await Section.find();

      return responseServer(
        res,
        statusConstants.SUCCESS_CODE,
        'Get data successfully',
        allSection
      );
    } catch (error) {
      return raiseException(res, statusConstants.BAD_REQUEST_CODE, error);
    }
  },
  updateSection: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, subTitle, description } = req.body;
      await Section.findByIdAndUpdate(id, {
        title,
        subTitle,
        description,
      });

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

module.exports = sectionCtrl;
