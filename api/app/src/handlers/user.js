const User = require("../business/user");
const responseUtil = require("../utils/responseUtil");

module.exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const user = new User();
    const response = await user.create(body);
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};

module.exports.listStats = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = new User();
    const response = await user.listStats(userId);
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = new User();
    const response = await user.deleteById(userId);
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};

module.exports.createUrl = async (req, res, next) => {
  try {
    const body = req.body;
    const host = req.headers.host;
    const userId = req.params.userId;
    const user = new User();
    const response = await user.createUrl(userId, body, host);
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};
