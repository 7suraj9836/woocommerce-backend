const pool = require('../db');

const createProduct = async (product) => {
  const { userId, name, description, price, image_url, wc_product_id, status } = product;

  const result = await pool.query(
    `INSERT INTO products (user_id, name, description, price, image_url, wc_product_id, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [userId, name, description, price, image_url, wc_product_id, status]
  );

  return result.rows[0];
};

const getProductsByUser = async (userId) => {
  const result = await pool.query('SELECT * FROM products WHERE user_id = $1', [userId]);
  return result.rows;
};


module.exports={createProduct, getProductsByUser};