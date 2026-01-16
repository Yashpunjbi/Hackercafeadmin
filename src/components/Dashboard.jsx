// src/components/Dashboard.jsx
import React from "react";
import { ShoppingCart, Clock, DollarSign } from "lucide-react";

const Dashboard = () => {
  // Dummy data (Firebase se connect karne ke liye aap baad me replace karenge)
  const stats = [
    {
      title: "Today's Orders",
      value: 12,
      icon: <ShoppingCart className="w-8 h-8 text-white" />,
      bg: "bg-gradient-to-r from-pink-500 to-orange-400",
    },
    {
      title: "Pending Orders",
      value: 5,
      icon: <Clock className="w-8 h-8 text-white" />,
      bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
    {
      title: "Total Sales",
      value: "₹1,250",
      icon: <DollarSign className="w-8 h-8 text-white" />,
      bg: "bg-gradient-to-r from-green-400 to-teal-500",
    },
  ];

  return (
    <div className="p-6 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-2">Welcome, Admin 👋</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Here's a quick overview of your kitchen today.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 ${stat.bg}`}
          >
            <div className="p-4 bg-white/20 rounded-full mr-4 flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{stat.title}</h2>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Extra section for future charts or stats */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Insights</h2>
        <p className="text-gray-600 dark:text-gray-300">
          You can add charts, graphs, or recent order summaries here to make your dashboard more interactive.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;