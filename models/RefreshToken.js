import pool from "../config/db.js";
const RefreshToken = {
	async create(userId, token, expiresAt) {
		await pool.query(`INSERT INTO refresh_tokens(user_id,token,expires_at) VALUES (?,?,?)`,
			[userId,token,expiresAt]);
	},
	async find(token) {
		const [rows] = await pool.query(`SELECT * FROM refresh_tokens WHERE token=?`, [token]);
		return rows[0];
	},
	async delete(token) {
		await pool.query(`DELETE FROM refresh_tokens WHERE token=?`, [token]);
	},
	async deleteByUser(userId) {
		await pool.query(`DELETE FROM refresh_tokens WHERE id=?`, [userId]);
	}
};

export default RefreshToken;