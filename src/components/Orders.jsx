import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    });

    return () => unsubscribe();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search)
  );

  const exportCSV = () => {
    if (filteredOrders.length === 0) return alert("No orders to export!");

    const header = ["Name", "Phone", "Address", "Items", "Total", "Status"];
    const rows = filteredOrders.map((order) => [
      order.name,
      order.phone,
      order.address,
      order.items.map((item) => `${item.name} x${item.qty}`).join(", "),
      order.total,
      order.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">📦 Orders</h2>

      <input
        type="text"
        placeholder="Search by name or phone..."
        className="mb-4 p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ Export CSV Button */}
      <button
        onClick={exportCSV}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded float-right"
      >
        📥 Export CSV
      </button>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 mt-4">No orders found.</p>
      ) : (
        <ul>
          {filteredOrders.map((order) => (
            <li
              key={order.id}
              className="border p-4 mb-4 rounded bg-white shadow"
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
                <strong>Items:</strong>{" "}
                {order.items.map((item) => `${item.name} x${item.qty}`).join(", ")}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;