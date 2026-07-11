import authService from "../services/authService.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { verifyRefreshToken } from "../utils/jwt.js";

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

const me = asyncHandler(async (req,res) => {
	const user = await User.findById(req.user.id);
	return ApiResponse.success(res, HTTP_STATUS.OK, "Usuario autenticado", user);
});

const refresh = asyncHandler(async (req,res) => {
	const token = req.cookies.refreshToken;
	const result = await authService.refresh(token);
	return ApiResponse.success(res, HTTP_STATUS.OK, MESSAGES.REFRESH_SUCCESS, result);
});

const logout = asyncHandler(async (req,res) => {
	const token = req.cookies.refreshToken;
	const payload = verifyRefreshToken(token);
	await authService.logout(payload.id);
	res.clearCookie("refreshToken");
	return ApiResponse.success(res, HTTP_STATUS.OK, MESSAGES.LOGOUT_SUCCESS);
});

export default {register, login, refresh, logout, me};