const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
// Create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product,
	});
});

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
	let resultPerPage = 4;
	
	const productCount=await Product.countDocuments()
	const apiFeature = new ApiFeatures(Product.find(), req.query)
		.Search()
		.Filter()
		.paginations(resultPerPage);
	const products = await apiFeature.query;
	res.status(200).json({ success: true, products });
});

// Get Product details

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	res.status(200).json({ success: true, product ,productCount});
});

// update product

exports.updateProduct = catchAsyncError(async (req, res) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		res.status(500).send({ success: false, message: "product not found" });
	} else {
		product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runvalidators: true,
			useFindAndModify: false,
		});
		res.status(200).json({ success: true, product });
	}
});

// delete product

exports.deleteProduct = catchAsyncError(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(500).json({
			success: false,
			message: "product not found",
		});
	} else {
		await product.deleteOne();
		res.status(200).json({
			success: true,
			message: "product deleted successfully",
		});
	}
});
