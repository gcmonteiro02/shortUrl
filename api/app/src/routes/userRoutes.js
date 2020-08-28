const { create, listStats, deleteById } = require("../handlers/user");
const userRoutes = require("../constants/userRoutes");
const express = require("express");
const middleware = require("../middlewares/joiMiddleware");
const userSchema = require("../schemas/joi/userSchema");
const router = express.Router();

router.post(userRoutes.create, middleware(userSchema.create, "body"), create);

router.delete(
  userRoutes.delete,
  middleware(userSchema.paramId, "params"),
  deleteById
);

router.get(
  userRoutes.listStats,
  middleware(userSchema.paramId, "params"),
  listStats
);

module.exports = router;
