import pool from "../config/db.js";
const User = {
	async findByEmail(email) {
		const [rows] = await pool.query(`SELECT * FROM users WHERE email=?`, [email]);
		return rows[0];
	},
	async findById(id) {
		const [rows] = await pool.query(`SELECT id,name,email,role,created_at FROM users WHERE id=?`, [id]);
		return rows[0];
	},
	async create(user) {
		const {name, email, password, role} = user;
		const [result] = await pool.query(`INSERT INTO users(name,email,password,role) VALUES (?,?,?,?)`,
			[name,email,password,role]);
			return result.insertId;
	},
	async updateRole(id, role) {
		await pool.query(`UPDATE users SET role=? WHERE id=?`, [role, id]);
	},
	async exists(id) {
		const [rows] = await pool.query(`SELECT id FROM users WHERE id=?`, [id]);
		return rows.length > 0;
	}
};

export default User;