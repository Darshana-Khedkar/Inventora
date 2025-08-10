const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { Parser } = require('json2csv');

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales: totalSales[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc Export all orders as CSV
exports.exportOrdersCSV = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('products.productId', 'name price');

    const flatData = orders.map((order) => ({
  OrderID: order._id,
  Customer: order.userId?.name || 'N/A',
  Email: order.userId?.email || 'N/A',
  Status: order.status,
  TotalAmount: order.totalAmount,
  CreatedAt: order.createdAt.toISOString(),
  Products: order.products
    .map((p) =>
      p.productId ? `${p.productId.name} (x${p.quantity})` : `Unknown Product`
    )
    .join(', '),
}));


    const parser = new Parser();
    const csv = parser.parse(flatData);

    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user (admin)
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, role } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    res.json({ message: 'User updated', user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user (admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
