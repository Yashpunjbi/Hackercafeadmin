// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react"; // Optional icon for mobile toggle

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false); // for mobile view toggle

  const getActiveClass = (path) =>
    location.pathname === path
      ? "bg-yellow-400 text-black font-semibold"
      : "text-white hover:bg-gray-800";

  return (
    <>
      {/* Mobile Top Toggle */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4 fixed w-full top-0 z-50">
        <h1 className="font-bold text-lg">Hacker Cafe</h1>
        <button onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          open ? "block" : "hidden"
        } md:block fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40 pt-20 md:pt-6 transition-all duration-300`}
      >
        <nav className="flex flex-col gap-2 px-4 py-4">
          <Link to="/" className={`p-2 rounded ${getActiveClass("/")}`}>
            Dashboard
          </Link>
          <Link to="/orders" className={`p-2 rounded ${getActiveClass("/orders")}`}>
            Orders
          </Link>
          <Link to="/products" className={`p-2 rounded ${getActiveClass("/products")}`}>
            Products
          </Link>
          <Link to="/offersadmin" className={`p-2 rounded ${getActiveClass("/offersadmin")}`}>
            Offers
          </Link>
          <Link to="/banners" className={`p-2 rounded ${getActiveClass("/banners")}`}>
            Banners
          </Link>
          <Link to="/categories" className={`p-2 rounded ${getActiveClass("/categories")}`}>
            Categories
          </Link>
          <Link to="/promo-codes" className={`p-2 rounded ${getActiveClass("/promo-codes")}`}>
            Promo Codes
          </Link>
        </nav>
      </div>

      {/* Padding for main content (avoid overlap with sidebar) */}
      <div className="pt-16 md:pt-0 md:ml-64 px-4">
        {/* Your page content will show here after routing */}
      </div>
    </>
  );
};

export default Sidebar;