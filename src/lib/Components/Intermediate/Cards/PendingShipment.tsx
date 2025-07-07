import React from "react";
import { HiOutlineTruck } from "react-icons/hi";

const PendingShipment = () => (
  <div className="bg-white rounded-2xl shadow-md p-6 max-w-md">
    <div className="flex items-center gap-3 mb-4">
      <HiOutlineTruck className="text-yellow-600 w-8 h-8" />
      <h3 className="text-lg font-semibold text-gray-700">Pending Shipments</h3>
    </div>

    <ul className="divide-y divide-gray-200">
      <li className="py-2">
        <p className="text-gray-700 font-medium">Organic Coconut Oil</p>
        <p className="text-sm text-gray-500">To: Nuwan Perera · ETA: June 21</p>
      </li>
      <li className="py-2">
        <p className="text-gray-700 font-medium">Rice 5KG Pack</p>
        <p className="text-sm text-gray-500">
          To: Kasuni Jayasuriya · ETA: June 22
        </p>
      </li>
      <li className="py-2">
        <p className="text-gray-700 font-medium">Dry Chillies 1KG</p>
        <p className="text-sm text-gray-500">
          To: Sandun Abeysekara · ETA: June 22
        </p>
      </li>
    </ul>

    <div className="text-sm text-blue-600 mt-3 hover:underline cursor-pointer">
      View All Shipments →
    </div>
  </div>
);

export default PendingShipment;
