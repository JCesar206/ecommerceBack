import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import "./config/db.js";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const allowedOrigins = ["http://localhost:5173", "https://jcesar206.github.io"];
app.use(cors({origin: allowedOrigins, credentials: true}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined",{stream:{write:(message)=>{logger.info(message.trim());}}}));
app.use("/uploads",express.static("uploads"));
app.get("/",(req,res)=>{res.json({message:"Ecommerce API funcionando"});});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Middleware global de errores
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{logger.info(`Servidor iniciado en http://localhost:${PORT}`);});