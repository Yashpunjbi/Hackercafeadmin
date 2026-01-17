import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { Search, MapPin, IndianRupee } from "lucide-react";

const Orders = ({ onlyToday = false }) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const q = onlyToday
      ? query(
          collection(db, "orders"),
          where("createdAt", ">=", Timestamp.fromDate(startOfToday))
        )
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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          🧾 {onlyToday ? "Today's Orders" : "All Orders"}
        </h2>

        {/* SEARCH */}
        <div className="flex items-center bg-white rounded-xl shadow px-3 py-2 w-full md:w-80">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search name / phone / order id"
            className="ml-2 w-full outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No orders found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-left">Items</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* CUSTOMER */}
                  <td className="p-4 font-medium text-gray-800">
                    {order.name || "N/A"}
                  </td>

                  {/* PHONE */}
                  <td className="p-4">{order.phone}</td>

                  {/* ADDRESS */}
                  <td className="p-4 max-w-xs">
                    <div className="flex gap-1 text-gray-600 text-xs">
                      <MapPin size={14} />
                      <span className="line-clamp-2">
                        {order.address || "No address"}
                      </span>
                    </div>
                  </td>

                  {/* ITEMS */}
                  <td className="p-4 text-xs">
                    {order.items?.map((item, idx) => (
                      <div key={idx}>
                        🍽 {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  {/* PRICE */}
                  <td className="p-4 font-semibold text-green-600">
                    <div className="flex items-center gap-1">
                      <IndianRupee size={14} />
                      {order.amount || order.totalPrice || 0}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <select
                      value={order.status || "placed"}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                      className="border rounded-lg px-2 py-1 text-xs bg-white focus:outline-none"
                    >
                      <option value="placed">Placed</option>
                      <option value="preparing">Preparing</option>
                      <option value="out_for_delivery">
                        Out for Delivery
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