const Product = require("../Models/products");

exports.getProducts = (req, res, next) => {
	Product.find()
		.then(products => {
			console.log(products);
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All products",
				path: "/products",
				hasProducts: products.length > 0,
				activeShop: true,
				productCSS: true,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getIndex = (req, res, next) => {
	Product.find()
		.then(products => {
			console.log(products);
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then(product => {
			console.log(product);
			res.render("shop/product-detail", {
				product: product,
				pageTitle: product.title,
				path: "/products",
			});
		})
		.catch(err => {
			console.log(err);
		});
};
