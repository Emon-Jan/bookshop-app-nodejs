const express = require("express");
const router = express.Router();

const adminController = require("../controller/admin");
const auth = require("../middleware/auth");

/* GET home page. */
router.get("/add-product", auth, adminController.getAddProduct);

router.get("/products", auth, adminController.getProducts);

router.get("/products", auth, adminController.getProducts);

router.post("/add-product", auth, adminController.postAddProduct);

router.get("/edit-product/:productId", auth, adminController.getEditProduct);

router.post("/edit-product", auth, adminController.postEditProduct);

router.post("/delete-product", auth, adminController.postDeleteProduct);

module.exports = router;
