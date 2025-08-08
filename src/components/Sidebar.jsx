import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Orders", path: "/orders" },
  { name: "Products", path: "/products" },
  { name: "Offers", path: "/offers" },
  { name: "Banners", path: "/banners" },
  { name: "Categories", path: "/categories" },
  { name: "Promo Codes", path: "/promocodes" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex flex-col fixed top-[56px] left-0 h-[calc(100vh-56px)] w-64 bg-white shadow-md p-4 z-30">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`mb-2 px-4 py-2 rounded hover:bg-yellow-100 ${
            location.pathname === item.path ? "bg-yellow-200 font-semibold" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;