exports.getLoginPage = (req, res, next) => {
    res.render("auth/login", {
        path: "login",
        pageTitle: "Login",
        isAuthenticated: req.session.isAuthenticated,
    });
}

exports.postLogin = (req, res, next) => {
    req.session.isAuthenticated = true;
    res.redirect('/');
}

exports.postLogout = (req, res, next) => {
    req.session.isAuthenticated = false;
    res.redirect('/');
}