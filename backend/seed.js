// backend/seed.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/inventora";

const users = [
  {
    name: "Normal User",
    email: "user@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "user",
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin", 10),
    role: "admin",
  },
];

const products = [
  { name: 'Organic Turmeric Powder', category: 'Grocery', price: 180, stock: 100, description: 'Pure turmeric powder from organic farms.', image: 'https://example.com/turmeric.jpg' },
  { name: 'Almonds 500g', category: 'Dry Fruits', price: 450, stock: 60, description: 'High-quality California almonds.', image: 'https://example.com/almonds.jpg' },
  { name: 'Green Tea Bags', category: 'Beverages', price: 120, stock: 80, description: '25 bags of organic green tea.', image: 'https://example.com/greentea.jpg' },
  { name: 'Cold Pressed Coconut Oil', category: 'Grocery', price: 320, stock: 40, description: 'Cold pressed virgin coconut oil.', image: 'https://example.com/coconut-oil.jpg' },
  { name: 'Multigrain Atta 5kg', category: 'Grocery', price: 300, stock: 90, description: 'Healthy multigrain flour.', image: 'https://example.com/multigrain.jpg' },
  { name: 'Cashew Nuts 250g', category: 'Dry Fruits', price: 260, stock: 70, description: 'Premium whole cashew nuts.', image: 'https://example.com/cashews.jpg' },
  { name: 'Apple Cider Vinegar', category: 'Beverages', price: 210, stock: 30, description: 'With mother, raw & unfiltered.', image: 'https://example.com/apple-cider.jpg' },
  { name: 'Brown Rice 1kg', category: 'Grocery', price: 100, stock: 120, description: 'Unpolished brown rice.', image: 'https://example.com/brown-rice.jpg' },
  { name: 'Herbal Shampoo 200ml', category: 'Personal Care', price: 180, stock: 50, description: 'Ayurvedic herbal shampoo.', image: 'https://example.com/shampoo.jpg' },
  { name: 'Toothpaste with Clove', category: 'Personal Care', price: 75, stock: 100, description: 'Natural toothpaste with clove oil.', image: 'https://example.com/toothpaste.jpg' },
  { name: 'Oats 1kg', category: 'Breakfast', price: 110, stock: 90, description: 'Wholegrain rolled oats.', image: 'https://example.com/oats.jpg' },
  { name: 'Green Moong Dal 1kg', category: 'Grocery', price: 95, stock: 80, description: 'Unpolished moong dal.', image: 'https://example.com/moong.jpg' },
  { name: 'Aloe Vera Gel', category: 'Personal Care', price: 150, stock: 45, description: 'Pure aloe vera skin gel.', image: 'https://example.com/aloe.jpg' },
  { name: 'Chia Seeds 250g', category: 'Health', price: 130, stock: 55, description: 'Raw chia seeds for smoothies.', image: 'https://example.com/chia.jpg' },
  { name: 'Peanut Butter 500g', category: 'Spreads', price: 180, stock: 60, description: 'Crunchy natural peanut butter.', image: 'https://example.com/peanutbutter.jpg' },
  { name: 'Instant Coffee 100g', category: 'Beverages', price: 160, stock: 70, description: 'Freeze-dried instant coffee.', image: 'https://example.com/coffee.jpg' },
  { name: 'Rock Salt 1kg', category: 'Grocery', price: 60, stock: 110, description: 'Pure Himalayan pink salt.', image: 'https://example.com/salt.jpg' },
  { name: 'Lentils Mix 1kg', category: 'Grocery', price: 105, stock: 95, description: 'Mix of various lentils.', image: 'https://example.com/lentils.jpg' },
  { name: 'Honey & Almond Soap', category: 'Personal Care', price: 45, stock: 75, description: 'Handmade soap with honey & almond oil.', image: 'https://example.com/soap.jpg' },
  { name: 'Organic Ghee 500ml', category: 'Grocery', price: 450, stock: 30, description: 'A2 cow ghee from grass-fed cows.', image: 'https://example.com/ghee.jpg' },
];

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    console.log("✅ Users Added");

    await Product.insertMany(products);
    console.log("✅ Products Added");

    console.log("🎉 Seeding Completed!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

importData();
