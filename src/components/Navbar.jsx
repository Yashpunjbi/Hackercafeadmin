// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between shadow-sm">
      {/* Mobile toggle button */}
      <button
        className="md:hidden text-xl"
        onClick={onToggleSidebar}
      >
        ☰
      </button>

      <h1 className="text-xl font-bold">Hacker Cafe Admin</h1>

      {/* Right-side content (if any) */}
      <div>
        {/* Add user profile, logout, etc. */}
      </div>
    </header>
  );
};

export default Navbar;