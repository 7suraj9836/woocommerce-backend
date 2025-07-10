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


exports.update = async (req, res) => {
  try {
    const updated = await productService.updateProductForUser(
      req.user.userId,
      req.params.id,
      req.body
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await productService.deleteProductForUser(req.user.userId, req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


