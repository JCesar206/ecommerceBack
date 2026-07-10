import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({origin:"http://localhost:5173", credentials:true}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.get("/",(req,res)=>{res.json({message:"Ecommerce API funcionando"});});
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Servidor corriendo en puerto ${PORT}`);});