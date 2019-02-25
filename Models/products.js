const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	discription: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Product", productSchema);

// const products = [];

// module.exports = class Product {
// 	constructor(t) {
// 		this.title = t;
// 	}

// 	save() {
// 		products.push(this);
// 	}

// 	fetchAll() {
// 		// needs to be static
// 		return products;
// 	}
// };
