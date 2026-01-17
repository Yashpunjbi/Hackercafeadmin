import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snap) => {
      setOrders(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, []);

  const todayOrders = orders.filter((o) => {
    if (!o.createdAt) return false;
    const d = o.createdAt.toDate();
    const today = new Date();
    return d.toDateString() === today.toDateString();
  });

  const pending = orders.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled"
  );

  const totalSales = orders.reduce(
    (sum, o) => sum + (o.amount || 0),
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome Admin 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* TODAY ORDERS */}
        <div
          onClick={() => navigate("/orders?today=true")}
          className="cursor-pointer bg-white rounded-2xl shadow p-5 hover:scale-105 transition"
        >
          <h3 className="text-gray-500">Today's Orders</h3>
          <p className="text-3xl font-bold mt-2">{todayOrders.length}</p>
        </div>

        {/* PENDING */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500">Pending Orders</h3>
          <p className="text-3xl font-bold mt-2">{pending.length}</p>
        </div>

        {/* SALES */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500">Total Sales</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            ₹{totalSales}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;