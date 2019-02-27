const express = require("express");
const router = express.Router();

const shopController = require("../controller/shop");

/* GET users listing. */
router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart");
router.get("/orders");
router.get("/checkout");

module.exports = router;
