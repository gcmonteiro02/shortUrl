const connection = require("./connection");
const createError = require("http-errors");
const MYSQL_TABLES = require("../constants/mysqlTables");
const MYSQL_COLUMNS = require("../constants/mysqlColumns");

class GlobalDatabase {
  /**
   * Function responsible for list global stats in DB
   */
  async listStats() {
    try {
      return await queryUserStats();
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

   /**
   * Function responsible for list url stats by id
   * @param {Number} urlId
   */
  async listStatsById(urlId) {
    try {
      return await queryUrlStats(urlId);
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }
}

/**
 * Function responsible for consulting the bank and bringing ready results.
 */
const queryUserStats = async () => {
  try {
    const topUrlsGlobalQueryLimit = await getQueryGlobalLimitOfMostAcessableUrls();
    const mostGlobalAccessedUrls = await connection(MYSQL_TABLES.URLS)
      .select("*")
      .orderBy(MYSQL_COLUMNS.URLS.HITS, "desc")
      .limit(Number(topUrlsGlobalQueryLimit));
    const totalUrls = await connection(MYSQL_TABLES.URLS).count(
      "id as total_urls"
    );
    const totalHits = await connection(MYSQL_TABLES.URLS).sum(
      "hits as total_hits"
    );
    return {
      mostAccessedUrls: mostGlobalAccessedUrls,
      totalUrls: totalUrls[0].total_urls,
      totalHits: totalHits[0].total_hits,
    };
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};

/**
 * Function responsible for get the db top urls configuration.
 */
const getQueryGlobalLimitOfMostAcessableUrls = async () => {
  try {
    const queryLimit = await connection(MYSQL_TABLES.APP_CONFIG_VARIABLES)
      .select(MYSQL_COLUMNS.APP_CONFIG_VARIABLES.CFG_VALUE)
      .where(
        MYSQL_COLUMNS.APP_CONFIG_VARIABLES.CFG_NAME,
        "=",
        "top_global_urls_limit"
      );
    return queryLimit[0].cfg_value;
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};


/**
 * Function responsible for consulting the bank and bringing ready results.
 * @param {String} queryUserUrls
 */
const queryUrlStats = async (urlId) => {
  try {
    const urlStats = await connection(MYSQL_TABLES.URLS)
      .select("*")
      .where(MYSQL_COLUMNS.URLS.ID, '=', urlId)
    return urlStats[0]; 
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};
module.exports = GlobalDatabase;
