import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import AdminProductList from './pages/AdminProductList';
import EditProduct from './pages/EditProduct';
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<div className="p-10">Welcome to Dashboard!</div>} />
        <Route path="/products" element={<ProductList />} />

        {/* Admin Routes */}
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/admin/products/add" element={<AddProduct />} />

        <Route path="/admin/products/:id/edit" element={<EditProduct />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />

      </Routes>
    </Router>
  );
}

export default App;
