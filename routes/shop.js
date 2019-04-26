const express = require("express");
const router = express.Router();

const shopController = require("../controller/shop");
const auth = require("../middleware/auth");

/* GET users listing. */
router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", auth, shopController.getCart);
router.post("/cart", auth, shopController.postCart);
router.post("/cart-delete-item", auth, shopController.postCartDeleteItem);
router.post("/create-order", auth, shopController.postOrder);
router.get("/orders", auth, shopController.getOrder);
router.get("/checkout");

module.exports = router;
