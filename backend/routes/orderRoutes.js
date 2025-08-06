const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const { exportOrdersCSV } = require('../controllers/orderController');
router.get('/export/csv', protect, isAdmin, exportOrdersCSV);


// Protected Routes
router.post('/', protect, createOrder);
router.get('/', protect, isAdmin, getAllOrders);
router.get('/user/:userId', protect, getUserOrders);
router.put('/:id/status', protect, isAdmin, updateOrderStatus);

module.exports = router;
