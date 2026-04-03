const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = req.user.role === 'admin' ? {} : { user: req.user.id };
    if (status) query.orderStatus = status;

    const skip = (Number(page) - 1) * Number(limit);
    const orders = await Order.find(query)
      .populate('items.product', 'name images price')
      .populate('user', 'name email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(query);

    res.json({ success: true, orders, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images price')
      .populate('user', 'name email');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, transactionId } = req.body;
    const updates = { paymentStatus };
    if (transactionId) updates.transactionId = transactionId;

    const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await require('../models/User').countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const monthlySales = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          total: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        monthlySales
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
