const User = require("../business/user");
const responseUtil = require("../utils/responseUtil");

module.exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const user = new User();
    const response = await user.create(body);
    res.set("Content-Type", "application/json");
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
    res.set("Content-Type", "application/json");
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
    res.set("Content-Type", "application/json");
    res.status(response.statusCode).send(response.body);
  } catch (error) {
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};
