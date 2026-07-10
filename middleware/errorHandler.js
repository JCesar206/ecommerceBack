import logger from "../utils/logger.js";
const errorHandler = (err,req,res,next)=>{
	logger.error({
		message:err.message,
		stack:err.stack,
		url:req.originUrl,
		method:req.method
	});
	res.status(err.status || 500).json({success:false, message:err.message || "Error interno del servidor"});
};

export default errorHandler;