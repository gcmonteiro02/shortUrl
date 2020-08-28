const Url = require("../business/url");
const responseUtil = require("../utils/responseUtil");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode");

module.exports.redirect = async (req, res, next) => {
  try {
    const urlId = req.params.id;
    const url = new Url();
    const response = await url.redirectUrl(urlId);
    res.status(HTTP_STATUS_CODE.REDIRECT).redirect(response);
    res.end();
  } catch (error) {
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};

module.exports.del = async (req, res, next) => {
  try {
    const urlId = req.params.id;
    const url = new Url();
    await url.delUrl(urlId);
    res.status(HTTP_STATUS_CODE.DELETE).send({});
  } catch (error) {
    const errorResponse = responseUtil.errorResponse(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};
