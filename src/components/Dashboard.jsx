// src/components/Dashboard.jsx

import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👋</h1>
      <p className="text-lg">This is your dashboard. Use the sidebar to navigate and manage orders.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Today's Orders</h2>
          <p className="text-2xl mt-2 font-bold">12</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Pending Orders</h2>
          <p className="text-2xl mt-2 font-bold">5</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl mt-2 font-bold">₹1,250</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;