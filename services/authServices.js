import bcrypt from "bcryptjs";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/jwt.js";
import { ROLES } from "../constants/roles.js";
import { MESSAGES } from "../constants/messages.js";

const register = async ({name, email, password}) => {
	const existingUser = await User.findByEmail(email);
	if (existingUser) {
		throw new Error(MESSAGES.USER_EXISTS);
	}
	const hashedPassword = await bcrypt.hash(password,10);
	const userId = await User.create({name, email, password: hashedPassword, role: ROLES.USER});
	return await User.findById(userId);
};

const login = async ({email, password}) => {
	const user = await User.findByEmail(email);
	if (!user) {
		throw new Error(MESSAGES.INVALID_CREDENTIALS);
	}
	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		throw new Error(MESSAGES.INVALID_CREDENTIALS);
	}
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);
	const payload = verifyRefreshToken(refreshToken);
	await RefreshToken.deleteByUser(user.id);
	await RefreshToken.create(user.id, refreshToken, new Date(payload.exp * 1000));
	return {accessToken, refreshToken, user: {id: user.id, name: user.name, email: user.email, role: user.role}};
};

export default {register, login};