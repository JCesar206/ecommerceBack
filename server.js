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

const app = express();

logger.info("Iniciando Ecommerce API...");

process.on("uncaughtException", (error) => {
	logger.error(`Error no controlado: ${error.message}`);
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