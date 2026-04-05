const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middleware
app.use(cors({
  origin: ['the-outrage-store-production.up.railway.app'],
  credentials: false
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// ✅ Root route (IMPORTANT)
app.get('/', (req, res) => {
  res.send('Backend Working Perfect ✅');
});

// ✅ Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// ✅ PORT (IMPORTANT for deployment)
const PORT = process.env.PORT || 5000;

// ✅ Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ Error handling (optional but good)
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION:', err);
});