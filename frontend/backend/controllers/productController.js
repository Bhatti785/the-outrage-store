const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary').cloudinary;

exports.getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, isSale, isNew, page = 1, limit = 12 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (isSale) query.isSale = isSale === 'true';
    if (isNew) query.isNew = isNew === 'true';
    if (search) query.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });
    const total = await Product.countDocuments(query);

    res.json({ success: true, products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, oldPrice, stock, isNew, isSale } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    const product = await Product.create({
      name, description, category, price, oldPrice, stock, images, isNew, isSale
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const updates = { ...req.body };
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(file => file.path);
    }

    product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        const publicId = image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`the-outrage/${publicId}`);
      }
    }

    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
