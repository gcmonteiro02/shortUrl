const { redirect, del } = require("../handlers/url");
const urlRoutes = require("../constants/urlRoutes");
const express = require("express");
const middleware = require("../middlewares/joiMiddleware");
const urlSchema = require("../schemas/joi/urlSchema");
const urlRouter = express.Router();

urlRouter.get(
  urlRoutes.urlId,
  middleware(urlSchema.paramId, "params"),
  redirect
);

urlRouter.delete(
  urlRoutes.urlId,
  middleware(urlSchema.paramId, "params"),
  del
);


module.exports = urlRouter;
