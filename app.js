// const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const User = require("./Models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controller/error");

mongoose
	.connect("mongodb://localhost:27017/shop", { useNewUrlParser: true })
	.then(result => {
		console.log("Connected to db.");
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					name: "Emon",
					email: "muktadirimam@gmail.com",
					cart: {
						items: [],
					},
				});
				user.save();
			}
		});
	})
	.catch(err => {
		console.log(err);
		process.exit(1);
	});

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

app.use((req, res, next) => {
	User.findById("5c76f4d4d894923d59a7dc15")
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => {
			console.log(err);
		});
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// catch 404 and forward to error handler
app.use(errorController.get404);

module.exports = app;
