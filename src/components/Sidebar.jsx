import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const getActiveClass = (path) =>
    location.pathname === path ? "text-yellow-400 font-bold" : "text-white";

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/orders", label: "Orders" },
    { to: "/products", label: "Products" },
    { to: "/offersadmin", label: "Offers" },
    { to: "/banners", label: "Banners" },
    { to: "/categories", label: "Categories" },
    { to: "/promo-codes", label: "Promo Codes" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white flex justify-between items-center px-4 py-3 z-50 shadow-md md:hidden">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Drawer */}
      {open && (
        <div className="fixed top-12 left-0 w-3/4 h-full bg-gray-800 text-white p-4 z-40 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`${getActiveClass(link.to)} hover:text-yellow-400`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;