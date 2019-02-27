// const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

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

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// catch 404 and forward to error handler
app.use(errorController.get404);

mongoose
    .connect("mongodb://localhost:27017/shop", { useNewUrlParser: true })
    .then(result => {
        console.log("Connected to db.");
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

module.exports = app;
