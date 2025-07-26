// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold">🍔 Hacker Cafe</div>
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/orders" className="hover:text-yellow-400">Orders</Link>
        <Link to="/products" className="hover:text-yellow-400">Products</Link>
      </div>
    </nav>
  );
};

export default Navbar;