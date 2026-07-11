import { verifyAccessToken, VerifyAccessToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";

const authMiddleware = (req,res,next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return next(new Error(MESSAGES.TOKEN_REQUIRED, HTTP_STATUS.UNAUTHORIZED));
	}
	const token = authHeader.split(" ")[1];
	if (!token) {
		return next(new AppError(MESSAGES.TOKEN_REQUIRED, HTTP_STATUS.UNAUTHORIZED));
	}
	try {
		const payload = verifyAccessToken(token);
		req.user = payload;
		next();
	} catch (error) {
		next(new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS));
	}
};

export default authMiddleware;