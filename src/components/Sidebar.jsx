// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-md transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:static md:translate-x-0`}
    >
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end p-2">
        <button onClick={onClose} className="text-xl">✕</button>
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        <Link to="/" className={location.pathname === "/" ? "font-bold" : ""}>Dashboard</Link>
        <Link to="/orders" className={location.pathname === "/orders" ? "font-bold" : ""}>Orders</Link>
        <Link to="/products" className={location.pathname === "/products" ? "font-bold" : ""}>Products</Link>
        <Link to="/tiffin" className={location.pathname === "/tiffin" ? "font-bold" : ""}>Tiffin</Link>
        <Link to="/banners" className={location.pathname === "/banners" ? "font-bold" : ""}>Banners</Link>
        <Link to="/categories" className={location.pathname === "/categories" ? "font-bold" : ""}>Categories</Link>
        <Link to="/promo-codes" className={location.pathname === "/promo-codes" ? "font-bold" : ""}>Promo Codes</Link>
      </nav>
    </div>
  );
};

export default Sidebar;