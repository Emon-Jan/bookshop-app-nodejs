const bcrypt = require('bcrypt');
const User = require('../Models/user');

exports.getLoginPage = (req, res, next) => {
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: req.session.isAuthenticated,
    });
}

exports.getSignupPage = (req, res, next) => {
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "Sign UP",
        isAuthenticated: req.session.isAuthenticated,
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(userdoc => {
            if (!userdoc) {
                return res.redirect('/login');
            }
            bcrypt.compare(password, userdoc.password)
                .then(result => {
                    if (result) {
                        req.session.isAuthenticated = true;
                        req.session.user = userdoc;
                        return req.session.save(err => {
                            console.log("Error is here save:", err);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log("Error is here:", err);
                    res.redirect('/login');
                })
        })
        .catch(err => console.log("Error is here in end:", err))
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then(userdoc => {
            if (userdoc) {
                return res.redirect('/');
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}
