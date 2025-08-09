const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { exportOrdersCSV } = require("../controllers/orderController");

router.get("/export/csv", exportOrdersCSV);

// User places order
router.post('/', createOrder);

// Admin - get all orders
router.get('/', getAllOrders);

// User - view own orders
router.get('/user/:userId', getUserOrders);

// Admin - update status
router.put('/:id/status', updateOrderStatus);

module.exports = router;
