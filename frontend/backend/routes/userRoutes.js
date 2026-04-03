const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, promoteToAdmin, addToWishlist, getWishlist } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('admin'), getUsers);
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, addToWishlist);
router.delete('/:id', protect, authorize('admin'), deleteUser);
router.put('/:id/promote', protect, authorize('admin'), promoteToAdmin);

module.exports = router;
