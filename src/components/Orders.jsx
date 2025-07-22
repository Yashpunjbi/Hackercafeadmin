{orders.map((order) => (
  <div key={order.id} className="bg-white p-4 rounded shadow mb-4">
    <div className="flex justify-between">
      <div>
        <p className="font-bold text-lg">{order.name}</p>
        <p>{order.phone}</p>
        <p>{order.address}</p>
        <p className="text-gray-600 mt-1">Total: ₹{order.total}</p>
      </div>
      <div>
        <select
          className="border p-1 rounded text-sm"
          value={order.status}
          onChange={(e) => handleStatusChange(order.id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    </div>
    <ul className="text-sm mt-2">
      {order.items.map((item, idx) => (
        <li key={idx}>• {item.name} × {item.qty}</li>
      ))}
    </ul>
    <p className="text-xs text-gray-400 mt-1">
      {order.createdAt?.toDate().toLocaleString()}
    </p>
  </div>
))}