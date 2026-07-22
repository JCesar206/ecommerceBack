import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import "./config/db.js";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

console.log("===== VARIABLES JWT =====");
console.log("JWT_ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET);
console.log("JWT_REFRESH_SECRET:", process.env.JWT_REFRESH_SECRET);
console.log("ACCESS_TOKEN_EXPIRE:", process.env.ACCESS_TOKEN_EXPIRE);
console.log("REFRESH_TOKEN_EXPIRE:", process.env.REFRESH_TOKEN_EXPIRE);
console.log("=========================");

const app = express();

logger.info("Iniciando Ecommerce API...");

process.on("uncaughtException", (error) => {
	console.error(error);
	logger.error(error);
});

process.on("unhandledRejection", (error) => {
	console.error(error);
	logger.error(error);
});

process.on("unhandledRejection", (error) => {
	logger.error(`Promesa rechazada: ${error.message}`);
});

const allowedOrigins = [
	"http://localhost:5173",
	"https://jcesar206.github.io"
];

app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Origen no permitido por CORS"));
		}
	},
	credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined", 
	{stream: {
		write: (message) => {
			logger.info(message.trim());
		}
	}
}));

app.use((req, res, next) => { console.log(`${req.method} ${req.originalUrl}`); next(); });
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => { res.json({ message: "Ecommerce API funcionando" }); });

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Middleware global de errores
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	logger.info(`Servidor iniciado correctamente en puerto ${PORT}`);
});