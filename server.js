import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import "./config/db.js";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined",{stream:{write:(message)=>{logger.info(message.trim());}}}));
app.use("/uploads",express.static("uploads"));
app.get("/",(req,res)=>{res.json({message:"Ecommerce API funcionando"});});

app.use("/api/auth", authRoutes);

// Middleware global de errores
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{logger.info(`Servidor iniciado en http://localhost:${PORT}`);});