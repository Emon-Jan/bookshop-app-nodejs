exports.getLogin = (req, res, next) => {
    console.log(req);

    res.render("auth/login", {
        path: "login",
        pageTitle: "Login"
    });
}