const express = require("express");
const bodyParser = require("body-parser");
const { handlerError } = require("./utils/errorHandler");
const generalRoutes = require("./routes/generalRoutes");
const userRoutes = require("./routes/userRoutes");
const globalRoutes = require('./routes/globalRoutes');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(handlerError);
app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});
app.use(bodyParser.json({ limit: "1mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);
app.use(generalRoutes.userPath, userRoutes);
app.use(generalRoutes.globalPath, globalRoutes);
app.use(generalRoutes.url, urlRoutes);


module.exports = app;