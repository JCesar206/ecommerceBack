import logger from "../utils/logger.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
const errorHandler = (err,req,res,next)=>{
	logger.error({
		message: err.message,
		status: err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
		method: req.method,
		url: req.originUrl,
		stack: err.stack
	});
	res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({success:false, message:err.message || "Error interno del servidor"});
};

export default errorHandler;