// Core 
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const StoreSession = require('connect-mongodb-session')(session);
const cusrf = require('csurf');

// Models
const User = require("./Models/user");

// Routes 
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// Error
const errorController = require("./controller/error");

// URL of mongodb server
const MONGODB_URI = "mongodb://localhost:27017/shop";

// Create session collection within the mongodb
const store = new StoreSession({
	uri: MONGODB_URI,
	collection: 'sessions'
});

// MONGOOSE: mongodb client helps to connect and manage mongodb
// First connect to database , if not connected forcefully exit
mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true })
	.then(result => {
		console.log("Connected to db.");
	})
	.catch(err => {
		console.log(err);
		process.exit(1);
	});

// Taking express instance
const app = express();
const csrfSequrity = cusrf();
// views engine setup 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Keep logs only in development version
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Store session collection within the mongodb
app.use(session({ secret: "secret", resave: false, saveUninitialized: false, store: store }));
app.use(csrfSequrity);

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isAuthenticated;
	res.locals.csrfToken = req.csrfToken();
	next();
});
// if any user loggedin then this middleware is used
app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

// Registering routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// catch 404 and forward to error handler
app.use(errorController.get404);

module.exports = app;
