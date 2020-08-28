'use strict';
const createError = require("http-errors");
const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const HTTP_STATUS_CODE = require('../constants/httpStatusCode');
const ERROR_MESSAGES = require('../constants/errorMessages');
const UrlDatabase = require('../database/url');
/**
* Function that verify if some attribute is null
* @param {Object} attr
*/
module.exports.isNull = (attr) => {
    return attr == undefined || attr == '' || attr == null;
};
/**
* Function that check if is a valid url
* @param {String} url
*/
module.exports.checkIfIsAValidUrl = (url) => {
 try {
   const urlCheckResponse = url.match(urlRegex);
   if (urlCheckResponse) return;
   throw createError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGES.INVALID_URL);
 } catch (error) {
   throw createError(error.statusCode, error.message);
 }
};

module.exports.checkIfIsAValidUrlId = async (urlId) => {
  const urlDatabase = new UrlDatabase();
  const queryDbStats = await urlDatabase.getUrlById(urlId);
  if (queryDbStats === 0)
    throw createError(
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_MESSAGES.INVALID_URL_ID
    );
  return;
};