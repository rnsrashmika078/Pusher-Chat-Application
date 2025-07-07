import React from "react";

const orders = [
  {
    id: "#1001",
    customer: "John Doe",
    date: "2025-06-20",
    total: "Rs. 2,500",
    status: "Pending",
  },
  {
    id: "#1002",
    customer: "Jane Smith",
    date: "2025-06-19",
    total: "Rs. 3,800",
    status: "Shipped",
  },
  // Add more dummy orders...
];

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const OrdersPage = () => {
  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID or Customer"
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
        />
        <select className="px-4 py-2 border rounded-lg shadow-sm w-full md:w-auto">
          <option value="">Filter by Status</option>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColor[order.status as keyof typeof statusColor]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2">
          Previous
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
