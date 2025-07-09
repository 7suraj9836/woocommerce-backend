const axios = require('axios');
const dotenv=require('dotenv');
const https = require('https');
dotenv.config();

const agent = new https.Agent({
  rejectUnauthorized: false, // ⛔️ Accept self-signed certs (dev only)
});

const WC_URL = `${process.env.WC_URL}/wp-json/wc/v3/products`;
const AUTH = {
  auth: {
    username: process.env.WC_CONSUMER_KEY,
    password: process.env.WC_CONSUMER_SECRET,
  },
};

exports.syncProductToWoo = async (product) => {
  const payload = {
    name: product.name,
    type: 'simple',
    regular_price: product.price.toString(),
    description: product.description,
    images: [{ src: product.image_url }],
  };

  try {
    const response = await axios.post(WC_URL, payload,  {
      ...AUTH,
      httpsAgent: agent,
    });
    return response.data;
  } catch (error) {
    console.error('❌ WooCommerce Error:', error.response?.data || error.message);
    throw new Error('WooCommerce sync failed');
  }
};
