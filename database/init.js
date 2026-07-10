import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const createDatabase = async()=>{
	try{
		const connection = await mysql.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			port: process.env.DB_PORT
		});
		await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
		await connection.query(`USE ${process.env.DB_NAME}`);
		await connection.query(`CREATE TABLE IF NOT EXISTS users(
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			email VARCHAR(150) UNIQUE NOT NULL,
			password VARCHAR(255) NOT NULL,
			role ENUM('admin','user') DEFAULT 'user',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
		await connection.query(`CREATE TABLE IF NOT EXISTS products(
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(150) NOT NULL,
			description TEXT,
			image VARCHAR(255),
			price DECIMAL(10,2) NOT NULL,
			stock INT DEFAULT 0,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
		await connection.query(`CREATE TABLE IF NOT EXISTS refresh_tokens(
			id INT AUTO_INCREMENT PRIMARY KEY,
			user_id INT NOT NULL,
			token TEXT NOT NULL,
			expires_at DATETIME NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)`);

			console.log("Base de datos creada correctamente");
			await connection.end();
	} catch (error) {
		console.log(error);
	}
}

createDatabase();