import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { exec } from "child_process";
dotenv.config();
const reset = async()=>{
	try{
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			port: process.env.DB_PORT
		});
		await connection.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
		console.log("Base eliminada");
		await connection.end();
		exec("npm run db:init && npm run db:seed", (error,stdout)=>{
			if(error) {
				console.log(error);
				return;
			}
			console.log(stdout);
		});
	} catch (error) {
		console.log(error);
	}
};

reset();