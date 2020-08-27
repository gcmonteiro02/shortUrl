const isEmpty = require("is-empty");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode");
module.exports.handlerError = (error, req, res, next) => {
  res.status(error.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};
