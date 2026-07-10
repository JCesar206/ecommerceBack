import pool from "../config/db.js";
const Product = {
	async findAll() {
		const [rows] = await pool.query(`SELECT * FROM products ORDER BY id DESC`);
		return rows;
	},
	async findById(id) {
		const [rows] = await pool.query(`SELECT * FROM products WHERE id=?`, [id]);
		return rows[0];
	},
	async create(product) {
		const {name, description, image, price, stock} = product;
		const [result] = await pool.query(`INSERT INTO products (name,description,image,price,stock)
			VALUES (?,?,?,?,?)`, [name,description,image,price,stock]);
			return result.insertId;
			},
	async update(id, product) {
		const {name,description,image,price,stock} = product;
		await pool.query(`UPDATE products SET name=?,description=?,image=?,price=?,stock=? WHERE id=?`,
			[name,description,image,price,stock,id]);
		},
		async delete(id) {
			await pool.query(`DELETE FROM products WHERE id=?`, [id]);
		}
	}

	export default Product;