const { listStats, listStatsById } = require("../handlers/global");
const globalRoutes = require("../constants/globalRoutes");
const middleware = require("../middlewares/joiMiddleware");
const globalSchema = require("../schemas/joi/globalSchema");
const express = require("express");
const globalRouter = express.Router();

globalRouter.get(globalRoutes.getStats, listStats);

globalRouter.get(globalRoutes.getUrlStats, middleware(globalSchema.paramId, 'params'),  listStatsById);

module.exports = globalRouter;
