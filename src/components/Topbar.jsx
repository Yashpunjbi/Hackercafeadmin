import React from "react";

const Topbar = () => {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-700">Admin Panel</h2>
      <div className="flex items-center gap-4">
        <span className="text-gray-500">👨‍🍳 Admin</span>
      </div>
    </div>
  );
};

export default Topbar;
