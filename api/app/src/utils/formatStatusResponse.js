/**
 * Function responsible for format stats response
 * @param {Object} stats
 */
module.exports.formatStatsResponse = (stats) => {
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
