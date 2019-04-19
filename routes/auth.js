const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");

router.get('/login', authController.getLoginPage);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

module.exports = router;