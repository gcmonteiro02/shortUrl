const GlobalDatabase = require("../database/global");
const createError = require("http-errors");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode");
const {formatStatsResponse} = require('../utils/formatStatusResponse');
const {checkIfIsAValidUrlId} = require("../utils/commonsValidator")

class Global {
  /**
   * Function responsible for list global stats of urls
   */
  async listStats() {
    try {
      const globalDatabase = new GlobalDatabase();
      const queryDbStats = await globalDatabase.listStats();
      const queryDbStatsFormatted = formatStatsResponse(queryDbStats);
      const response = {
        statusCode: HTTP_STATUS_CODE.GET,
        body: JSON.stringify(queryDbStatsFormatted),
      };
      return response;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

   /**
   * Function responsible for list stats of urls by id
   *@param {Number} urlId
   */
  async listStatsById(urlId) {
    try {
      await checkIfIsAValidUrlId(urlId);
      const globalDatabase = new GlobalDatabase();
      const queryDbStats = await globalDatabase.listStatsById(urlId);
      const response = {
        statusCode: HTTP_STATUS_CODE.GET,
        body: JSON.stringify(queryDbStats),
      };
      return response;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }
}

module.exports = Global;