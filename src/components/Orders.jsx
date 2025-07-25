// src/components/Orders.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧾 Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-md shadow-md">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">Items</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{order.name || "N/A"}</td>
                  <td className="py-2 px-4">{order.phone}</td>
                  <td className="py-2 px-4">{order.address}</td>
                  <td className="py-2 px-4 whitespace-pre-wrap text-sm">
                    {order.items?.map((item, i) => (
                      <div key={i}>
                        🍽 {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 font-semibold capitalize">{order.status || "pending"}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleStatusUpdate(order.id, "completed")}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded mr-2"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order.id, "cancelled")}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
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