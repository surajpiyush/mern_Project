const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "please enter product name"],
		trim: true,
	},
	
	description: {
		type: String,
		required: [true, "please enter description"],
	},
	price: {
		type: Number,
		maxlenghth: [8, "please price should not exceed 8 digit"],
	},
	rating: {
		type: Number,
		default: 0,
	},
	image: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, "please enter required category"],
	},
	stock: {
		type: String,
		required: [true, "please enter required stock"],
		maxlenghth: [4, "stock can not exceed 4 character"],
		default: 1,
	},
	numOfReview: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: String,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("items", ProductSchema);
