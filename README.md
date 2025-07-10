# 🧠 WooCommerce Product Sync - Backend

This is the backend for a full-stack application where sellers can create products and sync them to a WooCommerce store using the WooCommerce REST API.

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- WooCommerce REST API
- Axios

---

## 🚀 Getting Started

### 1. Clone the Repository & Set Up

```bash
git clone https://github.com/yourusername/woocommerce-backend.git
cd woocommerce-backend

# Install dependencies
npm install

# Create a .env file in the root with the following content:
PORT=5000
JWT_SECRET=your_jwt_secret

PG_HOST=localhost
PG_USER=your_pg_user
PG_PASSWORD=your_pg_password
PG_DATABASE=woocommerce_data
PG_PORT=5432

WC_URL=https://your-site.local
WC_CONSUMER_KEY=ck_xxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxx

### 📬 Postman Collection (Optional)

You can find the API test collection here:  
[📂 Postman Collection](./postman/WooCommerce.postman_collection.json)
