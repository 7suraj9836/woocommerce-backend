const productService = require('../services/productService');

exports.create = async (req, res) => {
  const userId = req.user.userId;

  try {
    const product = await productService.createProductForUser(userId, req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyProducts = async (req, res) => {
  const userId = req.user.userId;

  try {
    const products = await productService.getProductsByUser(userId);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
