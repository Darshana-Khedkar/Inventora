const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.body.userId; // or use req.user._id if authenticated

    let total = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      products,
      totalAmount: total,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('products.productId');
    res.json(orders);
  } catch (err) {const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.body.userId; // or use req.user._id if authenticated

    let total = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      products,
      totalAmount: total,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

    res.status(500).json({ message: err.message });
  }
};

// @desc Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const { Parser } = require('json2csv');

exports.exportOrdersCSV = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');

    const data = orders.map(order => ({
      OrderID: order._id,
      User: order.userId?.name,
      Email: order.userId?.email,
      Total: order.totalAmount,
      Status: order.status,
      Date: order.createdAt.toISOString(),
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
