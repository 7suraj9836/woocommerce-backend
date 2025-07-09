const wooService = require('./wooService');
const productModel = require('../models/productModel');

exports.createProductForUser = async (userId, productData) => {
  const { name, description, price, image_url } = productData;

  let wcProduct = null;
  let status = 'Created Locally';

  try {
    wcProduct = await wooService.syncProductToWoo({ name, description, price, image_url });
    status = 'Synced to WooCommerce';
  } catch (e) {
    console.warn('⚠️ WooCommerce sync failed. Saving locally.');
    status = 'Sync Failed';
  }

  const product = await productModel.createProduct({
    userId,
    name,
    description,
    price,
    image_url,
    wc_product_id: wcProduct?.id || null,
    status,
  });

  return product;
};

exports.getProductsByUser = async (userId) => {
  return await productModel.getProductsByUser(userId);
};
