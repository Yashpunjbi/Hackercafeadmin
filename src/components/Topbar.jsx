// src/components/Topbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();
  const current = (path) => location.pathname === path ? "text-yellow-400 font-bold" : "";

  return (
    <>
      {/* Desktop Navbar (top) */}
      <div className="hidden sm:flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
        <div className="text-2xl font-bold">🍔 Hacker <span className="text-yellow-400">Cafe</span></div>
        <nav className="flex gap-8">
          <Link to="/" className={`hover:text-yellow-400 ${current("/")}`}>Dashboard</Link>
          <Link to="/orders" className={`hover:text-yellow-400 ${current("/orders")}`}>Orders</Link>
          <Link to="/products" className={`hover:text-yellow-400 ${current("/products")}`}>Products</Link>
        </nav>
        <div>👨‍💻 Admin</div>
      </div>

      {/* Mobile Navbar (bottom fixed) */}
      <div className="fixed bottom-0 w-full bg-gray-900 text-white flex justify-around py-2 sm:hidden z-50 shadow-t">
        <Link to="/" className={`flex flex-col items-center ${current("/")}`}>
          <span>📊</span>
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link to="/orders" className={`flex flex-col items-center ${current("/orders")}`}>
          <span>📦</span>
          <span className="text-sm">Orders</span>
        </Link>
        <Link to="/products" className={`flex flex-col items-center ${current("/products")}`}>
          <span>🛒</span>
          <span className="text-sm">Products</span>
        </Link>
      </div>
    </>
  );
};

export default Topbar;