const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  getAdminStats,
  exportOrdersCSV,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/adminController');

router.get('/stats', protect, isAdmin, getAdminStats);
router.get('/orders/export', protect, isAdmin, exportOrdersCSV);

// Admin user management
router.get('/users', protect, isAdmin, getUsers);
router.put('/users/:id', protect, isAdmin, updateUser);
router.delete('/users/:id', protect, isAdmin, deleteUser);

module.exports = router;
