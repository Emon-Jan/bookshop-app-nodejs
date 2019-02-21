// const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const passportSetup = require("./config/passport-setup");

const errorController = require("./controller/error");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);
app.use("/admin", adminRoutes);

// catch 404 and forward to error handler
app.use(errorController.get404);

// error handler
app.use(errorController.get500);

module.exports = app;
