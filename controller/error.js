exports.get404 = (req, res, next) => {
  res.status.render("404", { pageTitle: "Page Not Found" });
};

exports.get500 = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};
