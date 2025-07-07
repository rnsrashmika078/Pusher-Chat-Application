import React from "react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineDatabase,
  HiOutlineChartBar,
} from "react-icons/hi";

const DashboardMetrics = () => {
  const metrics = [
    {
      title: "Total Sales",
      value: "Rs. 120,000",
      icon: <HiOutlineCurrencyDollar className="text-green-600 w-8 h-8" />,
    },
    {
      title: "Orders",
      value: "320",
      icon: <HiOutlineShoppingBag className="text-blue-600 w-8 h-8" />,
    },
    {
      title: "Products",
      value: "42",
      icon: <HiOutlineDatabase className="text-purple-600 w-8 h-8" />,
    },
    {
      title: "Monthly Revenue",
      value: "Rs. 25,000",
      icon: <HiOutlineChartBar className="text-red-500 w-8 h-8" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4"
        >
          {item.icon}
          <div>
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
