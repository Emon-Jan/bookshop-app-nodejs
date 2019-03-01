const Product = require("../Models/products");
const Order = require("../Models/order");

exports.getProducts = (req, res, next) => {
	Product.find()
		.then(products => {
			// console.log(products);
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
			// console.log(products);
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
			// console.log(product);
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

exports.getCart = (req, res, next) => {
	req.user
		.populate("cart.items.productId")
		.execPopulate()
		.then(user => {
			// console.log(user.cart.items);
			const products = user.cart.items;
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your Cart",
				products: products,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId)
		.then(product => {
			return req.user.addToCart(product);
		})
		.then(result => {
			// console.log(result);
			res.redirect("/cart");
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postCartDeleteItem = (req, res, next) => {
	const prodId = req.body.productId;
	req.user
		.removeFromCart(prodId)
		.then(result => {
			// console.log(result);
			res.redirect("/cart");
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getOrder = (req, res, next) => {
	Order.find({ "user.userId": req.user._id })
		.then(orders => {
			res.render("shop/orders", {
				path: "/orders",
				pageTitle: "Your Order",
				orders: orders,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postOrder = (req, res, next) => {
	req.user
		.populate("cart.items.productId")
		.execPopulate()
		.then(user => {
			const products = user.cart.items.map(cartItems => {
				console.log(cartItems.productId);
				return {
					product: { ...cartItems.productId._doc },
					quantity: cartItems.quantity,
				};
			});
			const order = new Order({
				products: products,
				user: {
					name: req.user.name,
					userId: req.user,
				},
			});
			return order.save();
		})
		.then(result => {
			return req.user.clearCart();
		})
		.then(() => {
			res.redirect("/orders");
		})
		.catch(err => {
			console.log(err);
		});
};
