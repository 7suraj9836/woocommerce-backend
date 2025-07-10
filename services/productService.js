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

exports.updateProductForUser = async (userId, productId, updatedData) => {
  const existing = await productModel.getProductById(productId);

  if (!existing || existing.user_id !== userId) {
    throw new Error('Product not found or not authorized');
  }

  let wcStatus = 'Updated Locally';

  try {
    if (existing.wc_product_id) {
      await wooService.updateWooProduct(existing.wc_product_id, updatedData);
      wcStatus = 'Synced to WooCommerce';
    }
  } catch (err) {
    wcStatus = 'Sync Failed';
    console.warn('❌ Woo sync failed on update');
  }

  const updated = await productModel.updateProduct(productId, updatedData, wcStatus);
  return updated;
};


exports.deleteProductForUser = async (userId, productId) => {
  const product = await productModel.getProductById(productId);

  if (!product || product.user_id !== userId) {
    throw new Error('Product not found or not authorized');
  }

  try {
    if (product.wc_product_id) {
      await wooService.deleteWooProduct(product.wc_product_id);
    }
  } catch (err) {
    console.warn('❌ Failed to delete from WooCommerce');
  }

  await productModel.deleteProduct(productId);
  return { success: true };
};
