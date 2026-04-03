const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    name: String,
    image: String
  }],
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['bank_transfer', 'cod']
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Rejected'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    default: null
  },
  paymentScreenshot: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
