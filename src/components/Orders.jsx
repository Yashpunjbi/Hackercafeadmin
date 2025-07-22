
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all orders from Firestore
  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Filtered orders by name or phone
  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm)
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
        Customer Orders
      </h2>

      <input
        type="text"
        placeholder="Search by name or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded mb-4 bg-gray-50 shadow-sm"
          >
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Cooking">Cooking</option>
                <option value="Delivered">Delivered</option>
              </select>
            </p>
            <p className="mt-2">
              <strong>Items:</strong>
            </p>
            <ul className="list-disc ml-6">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} x {item.qty} — ₹{item.price * item.qty}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold text-pink-600">
              Total: ₹{order.total}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;