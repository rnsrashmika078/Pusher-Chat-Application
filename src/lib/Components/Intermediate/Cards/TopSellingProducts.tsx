import React from "react";

const TopSellingProducts = () => (
  <div className="bg-white rounded-2xl shadow-md p-6 max-w-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">
      Top Selling Products
    </h3>

    <ul className="space-y-4">
      <li className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-800">🥇 Organic Red Rice</p>
          <p className="text-sm text-gray-500">Total Sold: 240 units</p>
        </div>
        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Rs. 72,000
        </span>
      </li>

      <li className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-800">🥈 Kithul Treacle</p>
          <p className="text-sm text-gray-500">Total Sold: 180 units</p>
        </div>
        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Rs. 54,000
        </span>
      </li>

      <li className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-800">🥉 Jackfruit Chips</p>
          <p className="text-sm text-gray-500">Total Sold: 140 units</p>
        </div>
        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Rs. 28,000
        </span>
      </li>
    </ul>

    <div className="text-sm text-blue-600 mt-4 hover:underline cursor-pointer">
      View All Products →
    </div>
  </div>
);

export default TopSellingProducts;
