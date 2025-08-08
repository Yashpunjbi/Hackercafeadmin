import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react"; // For mobile toggle icon

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false); // for mobile menu toggle

  const getActiveClass = (path) =>
    location.pathname === path
      ? "bg-yellow-400 text-black font-semibold"
      : "text-white hover:bg-gray-800";

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex justify-between items-center bg-gray-900 text-white p-4 fixed top-0 left-0 right-0 z-50">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <button onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          open ? "block" : "hidden"
        } md:block fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-40 pt-20 md:pt-6 transition-all`}
      >
        <nav className="flex flex-col gap-2 px-4 py-2">
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
    </>
  );
};

export default Sidebar;