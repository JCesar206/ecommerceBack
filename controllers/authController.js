import authService from "../services/authServices.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";

const register = asyncHandler(async(req,res) => {
	const user = await authService.register(req.body);
	return ApiResponse.success(res, HTTP_STATUS.CREATED, MESSAGES.REGISTER_SUCCESS, user);
});
const login = asyncHandler(async(req,res) => {
	const result = await authService.login(req.body);
	res.cookie("refreshToken", result.refreshToken, {
		httpOnly: true,
		sameSite: "lax",
		secure: false,
		maxAge: 7 * 24 * 60 * 60 * 1000
	});
	return ApiResponse.success(res, HTTP_STATUS.OK, MESSAGES.LOGIN_SUCCESS, {
		user: result.user,
		accessToken: result.accessToken
	});
});
export default {register, login};