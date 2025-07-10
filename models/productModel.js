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

const updateProduct = async (id, updated, status) => {
  const result = await pool.query(
    `UPDATE products SET name=$1, description=$2, price=$3, image_url=$4, status=$5 WHERE id=$6 RETURNING *`,
    [updated.name, updated.description, updated.price, updated.image_url, status, id]
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
};

const getProductById = async (id) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports={createProduct, getProductsByUser, updateProduct, deleteProduct,  getProductById};