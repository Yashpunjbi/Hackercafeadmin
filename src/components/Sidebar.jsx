// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-64 hidden sm:block">
  {/* Sidebar */}

</div>
      <h1 className="text-2xl font-bold mb-6">🍔 hacker cafe</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="block hover:text-yellow-400">Dashboard</Link>
        </li>
        <li>
          <Link to="/orders" className="block hover:text-yellow-400">Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;