const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { Parser } = require('json2csv');
const sendEmail = require('../utils/mailer');

exports.createOrder = async (req, res) => {
  try {
    const { products, userId } = req.body;

    // Fetch all products in one go
    const ids = products.map(p => p.productId);
    const dbProducts = await Product.find({ _id: { $in: ids } });

    if (dbProducts.length !== products.length) {
      return res.status(404).json({ message: 'One or more products not found' });
    }

    let total = 0;
    const orderItems = products.map(item => {
      const prod = dbProducts.find(p => p._id.toString() === item.productId);
      total += prod.price * item.quantity;
      return {
        productId: prod._id,
        name: prod.name,
        quantity: item.quantity,
        price: prod.price
      };
    });

    // Create the order
    const order = await Order.create({
      userId,
      products: orderItems.map(({ productId, quantity }) => ({ productId, quantity })),
      totalAmount: total,
    });

    // Fetch user info
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Build email details with product names
    const orderDetails = orderItems
      .map(p => `- ${p.name} (₹${p.price}) x${p.quantity}`)
      .join('\n');

    const emailBody = `
        New order placed by ${user.name} (${user.email}):

        Order ID: ${order._id}
        Total: ₹${order.totalAmount}
        Items:
        ${orderDetails}
    `;

    console.log('Email Body: ', emailBody);
    await sendEmail(user.email, 'New Order Placed - Inventora', emailBody);

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
