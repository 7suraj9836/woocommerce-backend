const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const authRoutes= require('./routes/authRoutes');
const productRoutes= require('./routes/productRoutes');
const pool = require('./db');

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);

// ✅ Test DB connection
pool.query('SELECT NOW()')
  .then(res => console.log(`✅ Connected to PostgreSQL at ${res.rows[0].now}`))
  .catch(err => console.error('❌ PostgreSQL connection failed:', err.message));

const PORT=process.env.PORT|| 5000;
app.listen(PORT, ()=>console.log(`Server is running at ${PORT}`))