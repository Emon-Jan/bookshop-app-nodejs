exports.getLoginPage = (req, res, next) => {
    res.render("auth/login", {
        path: "login",
        pageTitle: "Login",
        isAuthenticated: false,
    });
}

exports.postLogin = (req, res, next) => {
    req.session.isAuthenticated = true;
    res.redirect('/');
}