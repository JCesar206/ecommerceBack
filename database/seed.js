import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();
const seed = async()=>{
	try{
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			port: process.env.DB_PORT
		});

		const adminPassword = await bcrypt.hash("admin123",10);
		const userPassword = await bcrypt.hash("user123",10);
		await connection.query(`INSERT INTO users(name,email,password,role)
			VALUES ('Administrador','admin@test.com',?,'admin') ON DUPLICATE KEY UPDATE email=email`, [adminPassword]);

		await connection.query(`INSERT INTO users(name,email,password,role)
			VALUES ('Usuario','user@test.com',?,'user') ON DUPLICATE KEY UPDATE email=email`, [userPassword]);
		
		await connection.query(`DELETE FROM products`);
		await connection.query(`INSERT INTO products(name,description,image,price,stock) VALUES
			('Laptop ASUS','Laptop profesional para trabajo','laptop.jpg',899.99,19),
			('Mouse Logitech','Mouse inalámbrico','mouse.jpg',29.99,50),
			('Teclado Mecánico','Teclado RGB Gamer','keyboard.jpg',79.99,20),
			('Audífonos Sony','Audífonos bluetooth','headphones.jpg',59.99,30)`);
			logger.info("Base de datos poblada correctamente.");
			await connection.end();
	} catch (error) {
		console.log(error);
	}
};

seed();