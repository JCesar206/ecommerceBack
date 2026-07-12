import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";

const roleMiddleware = (...roles) => {
	return (req,res,next) => {
		if (!req.user) {
			return next(new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
		}

		if (!roles.includes(req.user.role)) {
			return next(new AppError(MESSAGES.ACCESS_DENIED, HTTP_STATUS.FORBIDDEN));
		}
		next();
	}
};

export default roleMiddleware;