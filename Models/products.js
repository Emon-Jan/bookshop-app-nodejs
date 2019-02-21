const products = [];

module.exports = class Product {
	constructor(t) {
		this.title = t;
	}

	save() {
		products.push(this);
	}

	fetchAll() {
		// needs to be static
		return products;
	}
};
