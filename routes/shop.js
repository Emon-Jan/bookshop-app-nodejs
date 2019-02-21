const express = require("express");
const router = express.Router();

const productController = require("../controller/product");

/* GET users listing. */
router.get("/", productController.getProducts);

module.exports = router;
