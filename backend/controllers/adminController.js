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

