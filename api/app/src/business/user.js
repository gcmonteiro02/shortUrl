const UserDatabase = require("../database/user");
const createError = require("http-errors");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode");
const SUCCESS_MESSAGES = require("../constants/successMessages");
const ERROR_MESSAGES = require("../constants/errorMessages");
class User {
  /**
   * Function responsible for create a new user
   * @param {Object} data
   */
  async create(data) {
    try {
      await checkIfUserAlreadyExists(data.id);
      const userObj = {
        user_id: data.id,
      };
      const userDatabase = new UserDatabase();
      await userDatabase.create(userObj);
      const response = {
        statusCode: HTTP_STATUS_CODE.POST,
        body: JSON.stringify({ id: userObj.user_id }),
      };
      return response;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }
  /**
   * Function responsible for delete a user in id
   * @param {String} userId
   */
  async deleteById(userId) {
    try {
      await checkIfIsValidUser(userId);
      await userDatabase.deleteById(userId);
      const response = {
        statusCode: HTTP_STATUS_CODE.DELETE,
        body: JSON.stringify({ message: SUCCESS_MESSAGES.USER_DELETED }),
      };
      return response;
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

  /**
   * Function responsible for list user by id
   * @param {Object} data
   */
  async listStats(userId) {
    try {
      await checkIfIsValidUser(userId);
      const userDatabase = new UserDatabase();
      const queryDbStats = await userDatabase.listStats(userId);
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
}

/**
 * Function responsible to check if is a valid user in request
 * @param {String} userId
 */
const checkIfIsValidUser = async (userId) => {
  const userDatabase = new UserDatabase();
  const queryDb = await userDatabase.listById(userId);
  if (queryDb.results === 0)
    throw createError(HTTP_STATUS_CODE.NOT_FOUND, ERROR_MESSAGES.USER_INVALID);
  return;
};

/**
 * Function responsible for check if user already exists in database
 * @param {String} userId
 */
const checkIfUserAlreadyExists = async (userId) => {
  try {
    const userDatabase = new UserDatabase();
    const queryDb = await userDatabase.listById(userId);
    if (queryDb.results > 0)
      throw createError(
        HTTP_STATUS_CODE.CONFLICT,
        ERROR_MESSAGES.USER_ALREADY_REGISTERED
      );
    return;
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};

/**
 * Function responsible for sum all stats of user
 * @param {Array} statusOfUser
 */
const formatStatsResponse = (stats) => {
  try {
    return (responseFormatted = {
      hits: stats.totalHits,
      urlCount: stats.totalUrls,
      topUrls: stats.mostAccessedUrls,
    });
  } catch (error) {
    throw createError(error.statusCode, error.message);
  }
};

module.exports = User;
