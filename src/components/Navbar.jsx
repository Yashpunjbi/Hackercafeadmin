import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getActiveClass = (path) =>
    location.pathname === path ? "text-yellow-400" : "text-white";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex justify-around shadow-lg z-50 text-xs">
      <Link to="/" className={`${getActiveClass("/")} font-semibold`}>
        Dashboard
      </Link>
      <Link
        to="/orders"
        className={`${getActiveClass("/orders")} font-semibold`}
      >
        Orders
      </Link>
      <Link
        to="/products"
        className={`${getActiveClass("/products")} font-semibold`}
      >
        Products
      </Link>
      <Link
        to="/offersadmin"
        className={`${getActiveClass("/offersadmin")} font-semibold`}
      >
        Offers
      </Link>
      <Link
        to="/banners"
        className={`${getActiveClass("/banners")} font-semibold`}
      >
        Banners
      </Link>
      <Link
        to="/categories"
        className={`${getActiveClass("/categories")} font-semibold`}
      >
        Categories
      </Link>
    </nav>
  );
};

export default Navbar;