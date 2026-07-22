import mysql from "mysql2/promise";
import logger from "../utils/logger.js";

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

const testConnection = async () => {
	try {
		const connection = await pool.getConnection();
		logger.info("MySQL conectado correctamente");
		connection.release();
	} catch (error) {
		logger.error(`Error conectando MySQL: ${error.message}`);
	}
};
testConnection();

export default pool;