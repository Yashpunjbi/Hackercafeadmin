// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 border-r shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={onClose} className="text-2xl text-gray-600">×</button>
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <nav className="flex flex-col gap-4">
            <Link to="/" className={location.pathname === "/" ? "font-semibold" : ""}>Dashboard</Link>
            <Link to="/orders" className={location.pathname === "/orders" ? "font-semibold" : ""}>Orders</Link>
            <Link to="/products" className={location.pathname === "/products" ? "font-semibold" : ""}>Products</Link>
            <Link to="/promo-codes" className={location.pathname === "/promo-codes" ? "font-semibold" : ""}>Promo Codes</Link>
            <Link to="/offersadmin" className={location.pathname === "/offersadmin" ? "font-semibold" : ""}>Offers</Link>
            <Link to="/banners" className={location.pathname === "/banners" ? "font-semibold" : ""}>Banners</Link>
            <Link to="/categories" className={location.pathname === "/categories" ? "font-semibold" : ""}>Categories</Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;