const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Load env variables
dotenv.config();

// App initialization
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`); // DEBUG
  next();
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);


const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);


// Basic Route
app.get('/', (req, res) => {
  console.log('###############################')
  res.send('Inventora API is running...');
});

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
console.log('MONGO => ', MONGO_URI)

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.warn('************')
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message);
  });
