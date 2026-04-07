const express = require('express');
const router = express.Router();
const { addToWishlist, getWishlist } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// GET  /api/wishlist        — fetch the authenticated user's wishlist
router.get('/', protect, getWishlist);

// POST /api/wishlist/:productId — toggle a product in/out of the wishlist
router.post('/:productId', protect, addToWishlist);

module.exports = router;
