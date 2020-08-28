const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { handlerError } = require("./utils/errorHandler");
const generalRoutes = require("./routes/generalRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(handlerError);
app.use(bodyParser.json({ limit: "1mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);
app.use(generalRoutes.userPath, userRoutes)

module.exports = app;