const connection = require("../database/connection");
const createError = require("http-errors");
const MYSQL_TABLES = require("../constants/mysqlTables");
const MYSQL_COLUMNS = require("../constants/mysqlColumns");
class UserDatabase {
  /**
   * Function responsible for create a new user into DB
   * @param {Object} data
   */
  async create(data) {
    try {
      return await connection(MYSQL_TABLES.USERS).insert(data);
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }
  /**
   * Function responsible for delete a user into DB
   * @param {String} userId
   */
  async deleteById(userId) {
    try {
      return await connection(MYSQL_TABLES.USERS)
        .where(MYSQL_COLUMNS.USERS.USERID, "=", userId)
        .del();
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

  /**
   * Function responsible for list user by id in DB
   * @param {String} userId
   */
  async listById(userId) {
    try {
      const query = await connection("users")
        .count("id as results")
        .where(MYSQL_COLUMNS.USERS.USERID, "=", userId);
      return query[0];
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

  /**
   * Function responsible for list user by id in DB
   * @param {String} userId
   */
  async listStats(userId) {
    try {
      const queryUserDbId = await getUserDbIdByUserId(userId);
      const queryUserIdsUrls = await getUrlsUser(queryUserDbId);
      return await queryUserStats(queryUserIdsUrls);
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }
}

/**
 * Function responsible for consulting the bank and bringing ready results.
 * @param {String} queryUserUrls
 */
const queryUserStats = async (queryUserIdsUrls) => {
  try {
    const topUrlsQueryLimit = await getQueryLimitOfMostAcessableUrls();
    const mostAccessedUrls = await connection(MYSQL_TABLES.URLS)
      .select("*")
      .whereIn(MYSQL_COLUMNS.URLS.ID, queryUserIdsUrls)
      .orderBy(MYSQL_COLUMNS.URLS.HITS, "desc")
      .limit(Number(topUrlsQueryLimit));
    const totalUrls = await connection(MYSQL_TABLES.URLS)
      .count("id as total_urls")
      .whereIn(MYSQL_COLUMNS.URLS.ID, queryUserIdsUrls);
    const totalHits = await connection(MYSQL_TABLES.URLS)
      .sum("hits as total_hits")
      .whereIn(MYSQL_COLUMNS.URLS.ID, queryUserIdsUrls);
    return {
      mostAccessedUrls: mostAccessedUrls,
      totalUrls: totalUrls[0].total_urls,
      totalHits: totalHits[0].total_hits,
    };
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};

/**
 * Function responsible for searching all urls belonging to a user and returning formatted.
 * @param {String} userIdInDb
 */
const getUrlsUser = async (userIdInDb) => {
  try {
    const queryUserUrls = await connection(MYSQL_TABLES.USERS_URLS)
      .select(MYSQL_COLUMNS.URLS.URLID)
      .where(MYSQL_COLUMNS.USERS.USERID, "=", userIdInDb);
    const formattedUrlIds = await formatUserUrlIds(queryUserUrls);
    return formattedUrlIds;
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};

/**
 * Function responsible for getting the db auto_increment id for the user id that the user registered
 * @param {String} userId
 */
const getUserDbIdByUserId = async (userId) => {
  try {
    const queryUserId = await connection(MYSQL_TABLES.USERS)
      .select(MYSQL_COLUMNS.USERS.ID)
      .where(MYSQL_COLUMNS.USERS.USERID, "=", userId);
    return queryUserId[0].id;
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};

/**
 * Function responsible for formatting the db response
 * @param {Array} array
 */
const formatUserUrlIds = async (array) => {
  try {
    let urlIdsFormatted = [];
    array.map(({ url_id }) => {
      urlIdsFormatted.push(url_id);
    });
    return urlIdsFormatted;
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};

/**
 * Function responsible for get the db top urls configuration.
 */
const getQueryLimitOfMostAcessableUrls = async () => {
  try {
    const queryLimit = await connection(MYSQL_TABLES.APP_CONFIG_VARIABLES)
      .select(MYSQL_COLUMNS.APP_CONFIG_VARIABLES.CFG_VALUE)
      .where(
        MYSQL_COLUMNS.APP_CONFIG_VARIABLES.CFG_NAME,
        "=",
        "top_user_urls_limit"
      );
    return queryLimit[0].cfg_value;
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};
module.exports = UserDatabase;
