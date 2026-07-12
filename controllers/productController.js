import productService from "../services/productService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";

const getAll = asyncHandler(async (req,res) => {
	const products = await productService.getAll();
	return ApiResponse.success(res, HTTP_STATUS.OK, MESSAGES.PRODUCTS_FETCHED, products);
});

const getById = asyncHandler(async (req,res) => {
	const product = await productService.getById(req.params.id);
	return ApiResponse.success(res, HTTP_STATUS.OK, MESSAGES.PRODUCT_FETCHED, product);
});

const create = asyncHandler(async (req,res) => {
	const product = await productService.create(req.body);
	return ApiResponse.success(res, HTTP_STATUS.CREATED, MESSAGES.PRODUCT_CREATED, product);
});

const update = asyncHandler(async (req,res) => {
	const product = await productService.update(req.params.id, req.body);
	return ApiResponse.success(res, HTTP_STATUS.OK, MESSAGES.PRODUCT_UPDATED, product);
});

const remove = asyncHandler(async (req,res) => {
	await productService.remove(req.params.id);
	return ApiResponse.success(res, HTTP_STATUS.OK, MESSAGES.PRODUCT_DELETE);
});

export default {getAll, getById, create, update, remove};