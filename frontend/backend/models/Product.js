const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select category'],
    enum: ['men', 'women', 'kids']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative']
  },
  salePrice: {
    type: Number,
    min: [0, 'Sale price cannot be negative'],
    default: null
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  images: [{
    type: String,
    required: true
  }],
  sizes: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  isNew: {
    type: Boolean,
    default: false
  },
  isSale: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
