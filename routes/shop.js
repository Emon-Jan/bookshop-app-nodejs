const express = require("express");
const router = express.Router();

const shopController = require("../controller/shop");

/* GET users listing. */
router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postCartDeleteItem);
router.post("/create-order", shopController.postOrder);
router.get("/orders", shopController.getOrder);
router.get("/checkout");

module.exports = router;
