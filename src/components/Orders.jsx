import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Search } from "lucide-react";

const Orders = ({ onlyToday = false }) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const q = onlyToday
      ? query(collection(db, "orders"), where("createdAt", ">=", today))
      : collection(db, "orders");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    });

    return () => unsubscribe();
  }, [onlyToday]);

  const handleStatusUpdate = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
  };

  const filteredOrders = orders.filter((order) =>
    `${order.name} ${order.phone} ${order.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-3">
        <h2 className="text-3xl font-bold">🧾 Orders</h2>

        {/* 🔍 Search */}
        <div className="flex items-center bg-white rounded-xl shadow px-3">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search name / phone / order id"
            className="px-2 py-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{order.name}</td>
                  <td className="p-3">{order.phone}</td>

                  <td className="p-3">
                    {order.items?.map((i, idx) => (
                      <div key={idx}>
                        🍽 {i.name} × {i.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="placed">Placed</option>
                      <option value="preparing">Preparing</option>
                      <option value="out_for_delivery">
                        Out for delivery
                      </option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;