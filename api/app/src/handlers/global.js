const Global = require("../business/global");
const responseUtil = require("../utils/responseUtil");

module.exports.listStats = async (req, res, next) => {
  try {
    const global = new Global();
    const response = await global.listStats();
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};

module.exports.listStatsById = async (req, res, next) => {
  try {
    const urlId = req.params.id;
    const global = new Global();
    const response = await global.listStatsById(urlId);
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};
