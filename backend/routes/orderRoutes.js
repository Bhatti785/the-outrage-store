const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrder, updateOrderStatus, updatePaymentStatus, getDashboardStats } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/dashboard/stats', protect, authorize('admin'), getDashboardStats);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);
router.put('/:id/payment', protect, authorize('admin'), updatePaymentStatus);

module.exports = router;
