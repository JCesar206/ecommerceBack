import pool from "../config/db.js";
const RefreshToken = {
	async create(userId, tokenHash, expiresAt) {
		await pool.query(`INSERT INTO refresh_tokens(user_id, token, expires_at) VALUES (?,?,?)`,
			[userId,tokenHash,expiresAt]);
	},
	async findByUserId(userId) {
		const [rows] = await pool.query(`SELECT * FROM refresh_tokens WHERE user_id=? LIMIT 1`, [userId]);
		return rows[0];
	},
	async deleteByUser(userId) {
		await pool.query(`DELETE FROM refresh_tokens WHERE user_id=?`, [userId]);
	}
};

export default RefreshToken;