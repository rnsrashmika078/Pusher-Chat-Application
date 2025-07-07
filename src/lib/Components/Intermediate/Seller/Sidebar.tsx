import {
  HiOutlineChartBar,
  HiOutlineChatAlt2,
  HiOutlineCube,
  HiOutlineDatabase,
  HiOutlinePlusCircle,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineTruck,
  HiOutlineViewGrid,
} from "react-icons/hi";
import Icons from "../Common/Icons";
import { setNotification } from "../Redux/NotifySlicer";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "../Redux/store";
import React from "react";
import { logout } from "../Redux/UserDataSlicer";
import { useNavigate } from "react-router-dom";
interface prop {
  clickRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSideBarItemRoute: (item: string) => void;
  currentItem: string;
}
const Sidebar: React.FC<prop> = ({
  clickRef,
  isOpen,
  setIsOpen,
  handleSideBarItemRoute,
  currentItem,
}) => {
  const dispatch = useDispatch<storeDispatch>();
  const navigate = useNavigate();
  const user = useSelector((store: storeState) => store.user.user);
  return (
    <div
      ref={clickRef}
      className={`z-900 fixed sm:fixed md:sticky lg:sticky xl:sticky top-0 left-0 h-screen transition-all duration-200 ${
        isOpen ? "w-0" : "w-64"
      } bg-gray-900 overflow-hidden `}
    >
      {/* Toggler */}
      <div className="z-900 ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={` transition-all transform  duration-200  ${
            isOpen ? "-translate-x-3" : "translate-x-62"
          } fixed top-1/2 my-2 mx-2 p-1 bg-gray-900 text-white rounded-r-full`}
        >
          <Icons name={isOpen ? "left_v2" : "right_v2"} />
        </button>
      </div>

      {/* Toggler */}
      <div className="flex flex-col p-5 h-screen overflow-y-auto">
        <div className="flex">
          <div className="flex justify-center items-center mx-5 gap-2">
            <img
              className="rounded-2xl"
              width={50}
              src="https://res.cloudinary.com/dwcjokd3s/image/upload/v1748257082/Listing/dx0mbgmsd7wf6ubov5y3.jpg"
            ></img>
            <p className="text-xl font-type font-light text-white">FarmNest</p>
          </div>
        </div>
        <div className="border border-gray-800 mt-5"></div>
        <div className="flex flex-col flex-grow mt-5">
          <div className="flex flex-col  text-lg text-white font-medium justify-between">
            {[
              { label: "Marketplace" },
              { label: "Dashboard" },
              { label: "Add Product" },
              { label: "Products" },
              { label: "Orders" },
              { label: "Reviews" },
              { label: "Stocks" },
              { label: "Analyse" },
              { label: "Shipment" },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => handleSideBarItemRoute(item.label)}
                className={`p-2 active:scale-110 transition-all ${
                  currentItem === item.label ? "bg-white/15" : "bg-transparent"
                } flex items-center rounded-md hover:bg-white/20 cursor-pointer transition-all duration-200 my-1`}
              >
                <div className="flex flex-row items-center gap-2 text-white text-sm">
                  {item.label === "Marketplace" && (
                    <HiOutlineShoppingCart size={24} />
                  )}
                  {item.label === "Dashboard" && (
                    <HiOutlineViewGrid size={24} />
                  )}
                  {item.label === "Add Product" && (
                    <HiOutlinePlusCircle size={24} />
                  )}
                  {item.label === "Products" && <HiOutlineDatabase size={24} />}
                  {item.label === "Orders" && (
                    <HiOutlineShoppingBag size={24} />
                  )}
                  {item.label === "Reviews" && <HiOutlineChatAlt2 size={24} />}
                  {item.label === "Stocks" && <HiOutlineCube size={24} />}
                  {item.label === "Analyse" && <HiOutlineChartBar size={24} />}
                  {item.label === "Shipment" && <HiOutlineTruck size={24} />}
                  <p className={`hover:text-green-200`}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex flex-col"
          onClick={() => {
            localStorage.clear();
            dispatch(
              setNotification({
                message: "You have logged Out!",
                type: "success",
              })
            );
            dispatch(logout());
            navigate("/auth/login");
          }}
        >
          <div className="flex flex-row items-center gap-2 text-white text-sm bg-gray-700 p-2 rounded-2xl hover:cursor-pointer active:scale-110 transition-all">
            <div className="flex rounded-full text-xl bg-blue-500 p-4 w-5 h-5 place-items-center items-center justify-center">
              {user?.email.slice(0, 1).toUpperCase()}
            </div>
            <p className={`font-type hover:text-green-200 `}>{"Logout"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
