import React, { useState } from "react";
import UserDropDown from "../../Common/UserDropDown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeState } from "../../Redux/store";
import Icons from "../../Common/Icons";

const StoreHeader: React.FC<{
  currentItem: string;
  handleSideBarItemRoute: (item: string) => void;
}> = ({ currentItem, handleSideBarItemRoute }) => {
  //   const [toggle, setToggle] = useState<boolean>(false);
  //   const user = useSelector((store: storeState) => store.user.user);
  //   const navigate = useNavigate();

  return (
    <div>
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Lanka Store</h1>
        <Nav
          currentItem={currentItem}
          handleSideBarItemRoute={handleSideBarItemRoute}
        />
      </header>
    </div>
  );
};
export default StoreHeader;
interface Nav {
  currentItem: string;
  handleSideBarItemRoute: (item: string) => void;
}
const Nav: React.FC<Nav> = ({ currentItem, handleSideBarItemRoute }) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);
  const [showQuickBar, setShowQuickBar] = useState<boolean>(false);
  const user = useSelector((store: storeState) => store.user.user);
  return (
    <nav className="">
      <div className=" flex sm:flex md:hidden lg:hidden xl:hidden">
        <div
          onClick={() => setShowQuickBar((prev) => !prev)}
          className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition"
        >
          <Icons name="bars" />
        </div>

        {showQuickBar && (
          <div className="fixed right-10 top-30 bg-white shadow-lg rounded-xl p-4 w-48 space-y-2 z-50">
            {[
              "Dashboard",
              "Products",
              "Orders",
              "View Profile",
              "Settings",
            ].map((item) => (
              <div key={item}>
                <li
                  onClick={() => handleSideBarItemRoute(item)}
                  className={`list-none px-4 py-2 rounded-lg cursor-pointer text-sm transition ${
                    item === currentItem
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </li>
              </div>
            ))}
            <div className="flex items-center gap-3 mb-2 hover:bg-gray-200 p-2 rounded-xl">
              <img
                src="https://randomuser.me/api/portraits/men/27.jpg"
                alt="Reviewer"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="rounded-lg cursor-pointer text-sm transition ">
                <p className="font-semibold text-gray-700">Lanka Store</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ul className="hidden sm:hidden md:flex lg:flex xl:flex space-x-6 text-gray-600 place-items-center">
        {["Dashboard", "Products", "Orders"].map((item) => (
          <li
            onClick={() => handleSideBarItemRoute(item)}
            className={`hover:text-blue-600 cursor-pointer ${
              item === currentItem ? "text-blue-500" : "text-gray-600"
            }`}
          >
            {item}
          </li>
        ))}
        <div
          onClick={() =>
            !user!.email ? navigate("/auth/login") : setToggle((prev) => !prev)
          }
        >
          <Icons name={"user-size"} />
        </div>
        <UserDropDown
          toggle={toggle}
          setToggle={setToggle}
          offsetX={5}
          offsetY={10}
        />
      </ul>
    </nav>
  );
};
