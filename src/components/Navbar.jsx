// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getActiveClass = (path) =>
    location.pathname === path ? "text-yellow-400" : "text-white";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex justify-around shadow-lg z-50">
      <Link to="/" className={`${getActiveClass("/")} text-sm font-semibold`}>
        Dashboard
      </Link>
      <Link
        to="/orders"
        className={`${getActiveClass("/orders")} text-sm font-semibold`}
      >
        Orders
      </Link>
      <Link
        to="/products"
        className={`${getActiveClass("/products")} text-sm font-semibold`}
      >
        Products
      </Link>
      <Link
        to="/offersadmin"
        className={`${getActiveClass("/offersadmin")} text-sm font-semibold`}
      >
        Offers
      </Link> {/* ✅ Add this */}
    </nav>
  );
};

export default Navbar;