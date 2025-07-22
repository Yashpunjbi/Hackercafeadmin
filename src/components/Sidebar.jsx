import React from "react";

const Sidebar = ({ setPage }) => {
  return (
    <div className="bg-white w-64 p-4 shadow h-full">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Bakchodi Admin</h1>
      <ul className="space-y-2">
        <li>
          <button
            className="w-full text-left p-2 hover:bg-pink-100 rounded"
            onClick={() => setPage("dashboard")}
          >
            📊 Dashboard
          </button>
        </li>
        <li>
          <button
            className="w-full text-left p-2 hover:bg-pink-100 rounded"
            onClick={() => setPage("orders")}
          >
            📦 Orders
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
