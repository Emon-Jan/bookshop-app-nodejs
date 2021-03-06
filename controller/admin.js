const Product = require("../Models/products");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/add-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product({
		title: title,
		price: price,
		description: description,
		imageUrl: imageUrl,
		userId: req.user._id,
	});
	product
		.save()
		.then(result => {
			// console.log("data saved with this id: ", result._id);
			res.redirect("/");
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getProducts = (req, res, next) => {
	Product.find()
		.then(products => {
			// console.log(products);
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then(product => {
			if (!product) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImageUrl = req.body.imageUrl;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;
	Product.findById(prodId)
		.then(product => {
			product.title = updatedTitle;
			product.price = updatedPrice;
			product.description = updatedDescription;
			product.imageUrl = updatedImageUrl;
			return product.save();
		})
		.then(result => {
			// console.log("Product updated!");
			res.redirect("/admin/products");
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByIdAndRemove(prodId)
		.then(result => {
			// console.log("Product deleted!");
			res.redirect("/admin/products");
		})
		.catch(err => {
			console.log(err);
		});
};
