// src/components/Orders.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

const statusColors = {
  placed: "bg-gray-200 text-gray-800",
  preparing: "bg-yellow-100 text-yellow-800",
  out_for_delivery: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, { status: newStatus });
  };

  const statusOptions = [
    "placed",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        🧾 Orders Management
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No orders found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {/* Customer */}
                  <td className="py-3 px-4 font-medium">
                    {order.name || "N/A"}
                  </td>

                  {/* Phone */}
                  <td className="py-3 px-4">{order.phone}</td>

                  {/* Address */}
                  <td className="py-3 px-4 max-w-xs text-gray-600 dark:text-gray-300">
                    {order.address}
                  </td>

                  {/* Items */}
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      {order.items?.map((item, i) => (
                        <div
                          key={i}
                          className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
                        >
                          🍽 {item.name} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <select
                      value={order.status || "placed"}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-lg font-semibold border focus:outline-none ${
                        statusColors[order.status || "placed"]
                      }`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.replace(/_/g, " ").toUpperCase()}
                        </option>
                      ))}
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