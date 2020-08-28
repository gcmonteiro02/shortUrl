const UrlDatabase = require("../database/url");
const createError = require("http-errors");
const { checkIfIsAValidUrlId } = require("../utils/commonsValidator");

class Url {
  /**
   * Function responsible for list user by id
   * @param {String} urlId
   */
  async redirectUrl(urlId) {
    try {
      await checkIfIsAValidUrlId(urlId);
      const urlDatabase = new UrlDatabase();
      const queryDbStats = await urlDatabase.redirectUrl(urlId);
      const url = splitUrl(queryDbStats);
      return `https://${url}`;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

   /**
   * Function responsible for delete url
   * @param {String} urlId
   */
  async delUrl(urlId) {
    try {
      await checkIfIsAValidUrlId(urlId);
      const urlDatabase = new UrlDatabase();
      await urlDatabase.delUrl(urlId);
      return;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }
}

/**
 * Function responsible for remove https/http/ftp
 * @param {String} url
 */
const splitUrl = (url) => {
  return url.replace(/^(https?|ftp):\/\//, "");
};

module.exports = Url;
