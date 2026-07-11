import bcrypt from "bcryptjs";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";
import { ROLES } from "../constants/roles.js";
import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const register = async ({name, email, password}) => {
	const existinUser = await User.findByEmail(email);
	if (existinUser) {
		throw new AppError(MESSAGES.USER_EXISTS, HTTP_STATUS.CONFLICT);
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const userId = await User.create({name, email, password: hashedPassword, role: ROLES.USER});
	return await User.findById(userId);
};

const login = async ({email, password}) => {
	const user = await User.findByEmail(email);
	if (!user) {
		throw new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
	}
const validPassword = await bcrypt.compare(password, user.password);
if (!validPassword) {
	throw new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
}

const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);
const payload = verifyRefreshToken(refreshToken);

await RefreshToken.deleteByUser(user.id);
const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
await RefreshToken.create(user.id, hashedRefreshToken, new Date(payload.exp * 1000));
return {accessToken, refreshToken, user: {id: user.id, name: user.name, email: user.email, role: user.role}};
};

const refresh = async (refreshToken) => {
	if (!refreshToken) {
		throw new AppError(MESSAGES.TOKEN_REQUIRED, HTTP_STATUS.UNAUTHORIZED);
	}
	const payload = verifyRefreshToken(refreshToken);
	const savedToken = await RefreshToken.findByUserId(payload.id);
	if (!savedToken) {
		throw new AppError(MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
	}
	const validToken = await bcrypt.compare(refreshToken, savedToken.token);
	if (!validToken) {
		throw new AppError(MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
	}

	const user = await User.findById(payload.id);
	const accessToken = generateAccessToken(user);
	return {accessToken, user};
};

const logout = async (userId) => {
	await RefreshToken.deleteByUser(userId);
};

export default {register, login, refresh, logout};