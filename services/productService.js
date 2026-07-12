import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";

const getAll = async () => {
	return await Product.findAll();
};
const getById = async (id) => {
	const product = await Product.findById(id);
	if (!product) {
		throw new AppError(MESSAGES.PRODUCT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
	}
	return product;
};

const create = async (productData) => {
	const productId = await Product.create(productData);
	return await Product.findById(productId);
};
const update = async (id, productData) => {
	const product = await Product.findById(id);
	if (!product) {
		throw new AppError(MESSAGES.PRODUCT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
	}
	await Product.update(id, productData);
	return await Product.findById(id);
};
const remove = async (id) => {
	const product = await Product.findById(id);
	if (!product) {
		throw new AppError(MESSAGES.PRODUCT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
	}
	await Product.delete(id);
}

export default {getAll, getById, create, update, remove};