import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateAccessToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			role: user.role
	},
	process.env.JWT_ACCESS_SECRET,
	{expiresIn: process.env.ACCESS_TOKEN_EXPIRE}
	);
};

export const generateRefreshToken = (user) => {
	return jwt.sign(
		{
			id: user.id
		},
		process.env.JWT_REFRESH_SECRET,
		{expiresIn: process.env.REFRESH_TOKEN_EXPIRE}
	);
};

export const verifyAccessToken = (token) => {
	return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
	return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};