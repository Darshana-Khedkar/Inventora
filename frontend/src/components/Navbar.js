import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount(); // Run on mount
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/products" className="font-bold">
        Inventora
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/products">Products</Link>

        {/* User-specific navigation */}
        {userInfo && userInfo.role === "user" && (
          <Link to="/my-orders">My Orders</Link>
        )}

        {/* Admin-specific navigation */}
        {userInfo && userInfo.role === "admin" && (
          <Link to="/admin/orders">Manage Orders</Link>
        )}

        {/* Cart */}
        {userInfo && userInfo.role === "user" && (
          <Link to="/cart" className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {/* Auth buttons */}
        {!userInfo && <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
