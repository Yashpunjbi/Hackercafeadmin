import React from "react";

const Orders = () => {
  const dummyOrders = [
    {
      id: 1,
      name: "Ramesh",
      items: ["Pizza", "Cold Drink"],
      status: "Pending",
    },
    {
      id: 2,
      name: "Suresh",
      items: ["Burger"],
      status: "Delivered",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-pink-500">Orders</h2>
      <ul className="space-y-4">
        {dummyOrders.map((order) => (
          <li
            key={order.id}
            className="bg-white shadow p-4 rounded border border-gray-200"
          >
            <h3 className="font-semibold">{order.name}</h3>
            <p className="text-gray-600">Items: {order.items.join(", ")}</p>
            <p
              className={`text-sm font-medium mt-2 ${
                order.status === "Delivered"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              Status: {order.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
