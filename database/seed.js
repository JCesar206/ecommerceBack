import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
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
		const password = await bcrypt.hash("admin123",10);
		await connection.query(`INSERT INTO users(name,email,password,role)
			VALUES ('Administrador','admin@test.com',?,'admin') ON DUPLICATE KEY UPDATE email=email`, [password]);
		await connection.query(`INSERT INTO products(name,description,image,price,stock) VALUES
			('Laptop ASUS','Laptop profesional para trabajo','laptop.jpg',899.99,19),
			('Mouse Logitech','Mouse inalámbrico','mouse.jpg',29.99,50),
			('Teclado Mecánico','Teclado RGB Gamer','keyboard.jpg',79.99,20),
			('Audífonos Sony','Audífonos bluetooth','headphones.jpg',59.99,30)`);
			console.log("Datos iniciales insertados.");
			await connection.end();
	} catch (error) {
		console.log(error);
	}
};

seed();