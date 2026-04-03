const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, authorize('admin'), upload.array('images', 5), createProduct);
router.put('/:id', protect, authorize('admin'), upload.array('images', 5), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;
