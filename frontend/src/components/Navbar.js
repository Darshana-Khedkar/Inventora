import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

//  useEffect(() => {
//    const cart = JSON.parse(localStorage.getItem("cart")) || [];
//    setCartCount(cart.length);
//    // Listen for changes in localStorage from other components
//    window.addEventListener("storage", () => {
//      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
//      setCartCount(updatedCart.length);
//    });
//  }, []);

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
      <Link to="/products" className="font-bold">Inventora</Link>
      <div className="flex gap-4 items-center">
        <Link to="/products">Products</Link>
        <Link to="/cart" className="relative">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
