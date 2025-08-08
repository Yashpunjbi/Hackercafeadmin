import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Orders", to: "/orders" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Offers", to: "/offersadmin" },
  { label: "Promo Codes", to: "/promo-codes" },
  { label: "Banners", to: "/banners" },
];

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle */}
      <div className="fixed top-0 left-0 w-full bg-white border-b z-50 sm:hidden flex items-center justify-between px-4 h-16 shadow">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full pt-16 transition-transform bg-white border-r shadow sm:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } sm:block`}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isActive(link.to)
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}