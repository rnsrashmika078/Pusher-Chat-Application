import React from "react";

const stockItems = [
  {
    id: 1,
    name: "Organic Honey",
    image: "https://via.placeholder.com/60",
    stock: 12,
  },
  {
    id: 2,
    name: "Spicy Mango Pickle",
    image: "https://via.placeholder.com/60",
    stock: 0,
  },
  {
    id: 3,
    name: "Jackfruit Chips",
    image: "https://via.placeholder.com/60",
    stock: 4,
  },
];

const getStockStatus = (qty: number) => {
  if (qty === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700" };
  if (qty < 5) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700" };
  return { label: "In Stock", color: "bg-green-100 text-green-700" };
};

const StocksPage = () => {
  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Stock Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stockItems.map((item) => {
          const status = getStockStatus(item.stock);
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">Stock: {item.stock}</p>
                <span
                  className={`text-xs mt-1 inline-block px-3 py-1 rounded-full font-medium ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Restock
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StocksPage;
