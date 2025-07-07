import React from "react";
import { HiOutlineClipboardList } from "react-icons/hi";

const NewOrder = () => (
  <div className="bg-white rounded-2xl shadow-md p-6 max-w-md">
    <div className="flex items-center gap-3 mb-4">
      <HiOutlineClipboardList className="text-blue-600 w-8 h-8" />
      <h3 className="text-lg font-semibold text-gray-700">New Orders</h3>
    </div>

    <ul className="space-y-4">
      <li className="flex justify-between">
        <div>
          <p className="font-medium text-gray-800">Coconut Oil (1L)</p>
          <p className="text-sm text-gray-500">By: Nimesh · June 19</p>
        </div>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full h-fit">
          Processing
        </span>
      </li>

      <li className="flex justify-between">
        <div>
          <p className="font-medium text-gray-800">Herbal Tea (100g)</p>
          <p className="text-sm text-gray-500">By: Shanuki · June 19</p>
        </div>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full h-fit">
          Processing
        </span>
      </li>

      <li className="flex justify-between">
        <div>
          <p className="font-medium text-gray-800">Spicy Pickle</p>
          <p className="text-sm text-gray-500">By: Dilan · June 18</p>
        </div>
        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full h-fit">
          Awaiting Payment
        </span>
      </li>
    </ul>

    <div className="text-sm text-blue-600 mt-4 hover:underline cursor-pointer">
      View All Orders →
    </div>
  </div>
);

export default NewOrder;
