// src/components/Dashboard.jsx
import React from "react";
import { ShoppingCart, Clock, DollarSign, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Today's Orders",
    value: 12,
    icon: <ShoppingCart size={24} className="text-white" />,
    color: "bg-gradient-to-r from-red-500 to-pink-500",
  },
  {
    title: "Pending Orders",
    value: 5,
    icon: <Clock size={24} className="text-white" />,
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  {
    title: "Total Sales",
    value: "₹1,250",
    icon: <DollarSign size={24} className="text-white" />,
    color: "bg-gradient-to-r from-green-400 to-teal-500",
  },
  {
    title: "Total Customers",
    value: 78,
    icon: <Users size={24} className="text-white" />,
    color: "bg-gradient-to-r from-blue-400 to-indigo-500",
  },
  {
    title: "Revenue Today",
    value: "₹3,400",
    icon: <TrendingUp size={24} className="text-white" />,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 text-gray-800 dark:text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Welcome, Admin 👋</h1>
      <p className="text-lg opacity-80 mb-6">
        This is your dashboard. Use the sidebar to navigate and manage orders.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`flex items-center justify-between p-5 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ${stat.color}`}
          >
            <div className="flex flex-col">
              <h3 className="text-white text-lg font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold mt-1 text-white">{stat.value}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">{stat.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;