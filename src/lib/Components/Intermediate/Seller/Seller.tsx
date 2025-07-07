import React, { useEffect, useRef, useState } from "react";
// import MarketPlaceNav from "../NavBar/MarketPlaceNav";

import {
    HiOutlineViewGrid,
    HiOutlinePlusCircle,
    HiOutlineTruck,
    HiOutlineChat,
    HiOutlineExclamationCircle,
    HiOutlineCurrencyDollar,
    HiOutlineShoppingBag,
    HiOutlineDatabase,
    HiOutlineClipboardList,
    HiOutlineChartBar,
    HiOutlineShoppingCart,
} from "react-icons/hi";

import DashboardMetrics from "../Cards/DashboardMetrics.jsx";
import NewOrder from "../Cards/NewOrder.jsx";
import LowStocks from "../Cards/LowStocks.jsx";
import TopSellingProducts from "../Cards/TopSellingProducts.jsx";
import LatestReview from "../Cards/LatestReview.jsx";
import PendingShipment from "../Cards/PendingShipment.jsx";
import StoreHeader from "../Cards/StoreHeader.jsx";
import Sidebar from "./Sidebar.js";
import OrdersPage from "./Pages/OrderPage.js";
import ReviewPage from "./Pages/ReviewPage.js";
import StocksPage from "./Pages/StockPage.js";
import HeaderPlate from "./HeaderPlate";

interface Store {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: number | 0;
    password: string;
    storename: string;
    description: string;
    address: string;
    district: string;
    province: string;
    city: string;
}

const Seller = () => {
    return (
        <div>
            {/* <div className=" fixed z-0 bg-green-600 left-0 top-0 p-25 rounded-b-2xl rounded-br-full h-[500px] w-[350px]"></div>
      <div className=" fixed z-0 bg-blue-600 right-0 bottom-0 p-25 rounded-b-2xl rounded-tl-full h-[500px] w-[350px]"></div> */}
            <div className="flex w-full h-screen overlfow-hidden">
                {/* {user ? (
                    <Sidebar
                        clickRef={clickRef}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        handleSideBarItemRoute={handleSideBarItemRoute}
                        currentItem={currentItem}
                    />
                ) : null} */}

                <div className="flex-1  p-5 bg-gray-100 h-screen overflow-y-scroll">
                    <div className="bg-white p-5 border border-gray-100 rounded-xl">
                        {/* {accountType === "user" || accountType === undefined ? ( */}
                            <>
                                <div className="py-5 ">
                                    <h1 className="fade-in uppercase text-green-600 text-2xl font-type font-bold">
                                        <div className="flex justify-start">
                                            <HeaderPlate header="Seller Hub" />
                                        </div>
                                        <h1 className="mt-4">
                                            Welcome to the seller hub !
                                        </h1>
                                    </h1>
                                    <p className="fade-in text-gray-600 text-sm font-type mt-2">
                                        Ready to grow your business? 🚀 This is
                                        your space to manage products, track
                                        orders, and connect with customers
                                        across Sri Lanka.
                                    </p>
                                </div>
                              
            </div>
        </div>
    );
};

export default Seller;


interface seller {
    isOpen: boolean;
    currentItem: string;
    handleSideBarItemRoute: (item: string) => void;
}
const SellerDashboard: React.FC<seller> = ({
    isOpen,
    currentItem,
    handleSideBarItemRoute,
}) => {
    const metrics = [
        {
            title: "Total Sales",
            value: "Rs. 120,000",
            icon: (
                <HiOutlineCurrencyDollar className="text-green-600 w-8 h-8" />
            ),
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
    // const user = useSelector((store: storeState) => store.user.user);
    // const navigate = useNavigate();

    return (
        <div className="relative z-50">
            <div className="mb-5 sticky -top-5 ">
                <StoreHeader
                    currentItem={currentItem}
                    handleSideBarItemRoute={handleSideBarItemRoute}
                />
            </div>
            <p className="text-center text-xl fade-in text-gray-600 font-type mt-10 mb-5">
                {currentItem === "Dashboard" &&
                    `Welcome to your seller dashboard! 📈 Manage your products, monitor
        orders, and connect with customers across Sri Lanka — all in one place.`}

                {currentItem === "Add Product" &&
                    `🔥 Got fresh goods? Let’s get them listed and sold on FarmerNest!`}
                {currentItem === "Products" &&
                    `📋 Manage and edit the items you’ve listed for sale.`}
            </p>

            {/* cards */}
            {currentItem === "Dashboard" && (
                <>
                    <DashboardMetrics />
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        <NewOrder />
                        <LowStocks />
                        <TopSellingProducts />
                        <PendingShipment />
                        <LatestReview />
                    </div>
                </>
            )}
            {currentItem === "Products" && (
                <div>
                    <Products />
                </div>
            )}
            {currentItem === "Add Product" && (
                <div>{/* <AddProduct isOpen={isOpen} /> */}</div>
            )}
            {currentItem === "Orders" && (
                <div>
                    <OrdersPage />
                </div>
            )}
            {currentItem === "Reviews" && (
                <div>
                    <ReviewPage />
                </div>
            )}
            {currentItem === "Stocks" && (
                <div>
                    <StocksPage />
                </div>
            )}
        </div>
    );
};

interface Params {
    header: string | null;
    total: number | 0;
    monthly: boolean | false;
    monthlySales: number | 0;
    icon: string;
    isOpen: boolean;
}
const Card: React.FC<Params> = ({
    header,
    total,
    monthly,
    isOpen,
    monthlySales,
    icon,
}) => {
    return (
        <div>
            <div
                className={`
          ${
              isOpen
                  ? "w-80 sm:w-70 md:w-60 lg:w-80 xl:w-90"
                  : "w-80 sm:w-70 md:w-60 lg:w-60 xl:w-70"
          }

         border border-gray-200 h-40 w-50 bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all`}
            >
                <div className=" p-5">
                    <h1 className="font-type text-center text-sm">{header}</h1>
                    <div className="flex flex-col justify-between text-4xl items-center">
                        {/* <Icons name={icon} /> */}
                        <h1 className="font-type text-start text-amber-600">
                            {total}
                        </h1>
                    </div>
                    <div className="flex justify-between py-1">
                        <h1 className="font-type text-start text-xs">
                            This month
                        </h1>
                        <h1 className="font-type text-start text-amber-600 text-xs">
                            {monthlySales}
                        </h1>
                    </div>
                    <div className="border-2 border-orange-500 w-1/2 transition-all"></div>
                </div>
            </div>
        </div>
    );
};
