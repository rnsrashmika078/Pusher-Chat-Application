import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const LowStocks = () => (
  <div className="bg-white rounded-2xl shadow-md p-6 max-w-md">
    <div className="flex items-center gap-3 mb-4">
      <HiOutlineExclamationCircle className="text-red-500 w-8 h-8" />
      <h3 className="text-lg font-semibold text-gray-700">Low Stock Alerts</h3>
    </div>

    <ul className="space-y-3">
      <li className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-700">Coconut Oil (500ml)</p>
          <p className="text-sm text-gray-500">Only 3 items left</p>
        </div>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
          Critical
        </span>
      </li>

      <li className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-700">Kithul Treacle</p>
          <p className="text-sm text-gray-500">Only 1 item left</p>
        </div>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
          Critical
        </span>
      </li>

      <li className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-700">Jackfruit Chips</p>
          <p className="text-sm text-gray-500">Only 6 items left</p>
        </div>
        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
          Warning
        </span>
      </li>
    </ul>

    <div className="text-sm text-blue-600 mt-4 hover:underline cursor-pointer">
      View Inventory →
    </div>
  </div>
);

export default LowStocks;
