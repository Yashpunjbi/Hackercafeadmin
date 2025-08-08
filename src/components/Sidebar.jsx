// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed z-40 inset-y-0 left-0 w-64 transform bg-white border-r transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-0`}
    >
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end p-2">
        <button
          className="text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/products">Products</Link>
          <Link to="/promocodes">Promo Codes</Link>
          <Link to="/banners">Banners</Link>
          <Link to="/categories">Categories</Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;