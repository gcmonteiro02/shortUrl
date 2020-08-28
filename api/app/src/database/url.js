const connection = require("./connection");
const createError = require("http-errors");
const MYSQL_TABLES = require("../constants/mysqlTables");
const MYSQL_COLUMNS = require("../constants/mysqlColumns");

class UrlDatabase {
  /**
   * Function responsible for list global stats in DB
   *@param {String} urlId
   */
  async redirectUrl(urlId) {
    try {
      const queryResponse = await connection(MYSQL_TABLES.URLS)
        .where(MYSQL_COLUMNS.URLS.ID, "=", urlId)
        .pluck(MYSQL_COLUMNS.URLS.URL);
      await hitUrl(urlId);
      return queryResponse[0];
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

  /**
   * Function responsible for get url by id
   *@param {Number} urlId
   */
  async getUrlById(urlId) {
    try {
      const queryResponse = await connection(MYSQL_TABLES.URLS)
        .count("id as results")
        .where(MYSQL_COLUMNS.URLS.ID, "=", urlId);
      return queryResponse[0].results;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

  /**
   * Function responsible for delete url
   *@param {String} urlId
   */
  async delUrl(urlId) {
    try {
      await connection(MYSQL_TABLES.URLS)
        .where(MYSQL_COLUMNS.URLS.ID, "=", urlId)
        .del();
      await connection(MYSQL_TABLES.USERS_URLS)
        .where(MYSQL_COLUMNS.URLS.URLID, "=", urlId)
        .del();
      return;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }
}

/**
 * Function responsible for hit the url
 *@param {Number} urlId
 */
const hitUrl = async (urlId) => {
  try {
    await connection(MYSQL_TABLES.URLS)
      .where(MYSQL_COLUMNS.URLS.ID, "=", urlId)
      .increment("hits", 1);
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};
module.exports = UrlDatabase;
