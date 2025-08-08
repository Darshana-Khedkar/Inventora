const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  getAdminStats,
  exportOrdersCSV,
} = require('../controllers/adminController');

router.get('/stats', protect, isAdmin, getAdminStats);
router.get('/orders/export', protect, isAdmin, exportOrdersCSV);

module.exports = router;
