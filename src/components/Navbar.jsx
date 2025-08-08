import React from "react";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const handleLogout = () => {
    // Add Firebase logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="w-full bg-black text-white flex justify-between items-center px-6 py-3 shadow-md fixed top-0 left-0 z-40">
      <h1 className="text-xl font-bold">Hacker Cafe Admin</h1>
      <button onClick={handleLogout} className="flex items-center gap-2 text-sm hover:text-yellow-400">
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

export default Navbar;