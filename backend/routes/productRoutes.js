const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Public (for customer browsing)
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin only (in future: add auth + role check middleware)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
