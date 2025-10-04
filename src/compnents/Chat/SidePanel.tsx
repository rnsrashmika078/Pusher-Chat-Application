import IconButton from "@/src/lib/Components/Basic/IconButton";
import { setActiveTab } from "@/src/redux/chatSlicer";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import React, { useState } from "react";
import { BsBookmarkStar } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { GrSchedulePlay } from "react-icons/gr";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import AddFriend from "../AddFriend/AddFriend";
import { User } from "@/interface/Types";
interface SideProps {
  allUsers: User[];
}
const SidePanel: React.FC<SideProps> = ({ allUsers }) => {
  const activeTab = useSelector((store: ReduxtState) => store.chat.activeTab);
  const [visibility, setVisibility] = useState<boolean>(false);

  const dispatch = useDispatch<ReduxDispatch>();
  return (
    <div className="bg-gray-800 select-none transition-all w-12 md:w-auto ">
      {visibility && (
        <AddFriend allUsers={allUsers} setVisibility={setVisibility} />
      )}
      <div
        className="hidden md:flex"
        onClick={() => setVisibility((prev: boolean) => !prev)}
      >
        <IconButton name="Add Friend">
          <FiPlus size={20} />
        </IconButton>
      </div>

      <div className="flex md:hidden text-white bg-blue-500 my-5  p-1  w-7 mx-3  justify-center items-center rounded-full hover:curosor-pointer hover:bg-blue-400 transition-all">
        <FiPlus
          size={20}
          onClick={() => setVisibility((prev: boolean) => !prev)}
        />
      </div>
      <div className="text-white">
        {[
          {
            name: "Inbox",
            icon: <HiOutlineInboxArrowDown size={20} />,
            color: "bg-blue-500",
            count: 5,
          },
          {
            name: "Groups",
            icon: <BsBookmarkStar size={20} />,
            color: "bg-red-500",
            count: 3,
          },
          // {
          //   name: "Draft",
          //   icon: <RiDraftFill size={20} />,
          //   color: "bg-green-500",
          //   count: 1,
          // },
          // {
          //   name: "Sent",
          //   icon: <MdOutlinePresentToAll size={20} />,
          //   color: "bg-orange-500",
          //   count: 7,
          // },
          {
            name: "Settings",
            icon: <IoIosSettings size={20} />,
            color: "",
            count: 1,
          },
          {
            name: "Shedules",
            icon: <GrSchedulePlay size={20} />,
            color: "",
            count: 2,
          },
          {
            name: "Management",
            icon: <GrSchedulePlay size={20} />,
            color: "",
            count: 2,
          },
        ].map((item, index) => (
          <React.Fragment key={index}>
            {(index === 3 || index === 0) && (
              <>
                {index == 3 && (
                  <div className="hidden md:flex text-gray-500  flex-col mx-5 mt-10">
                    Future Plans
                  </div>
                )}
                <div className="flex md:hidden border border-gray-600"></div>
              </>
            )}

            <div
              onClick={() => dispatch(setActiveTab(item.name))}
              className={`${
                index == 3 ? "mt-2" : "mt-3"
              } flex justify-between transition-all duration-300  gap-6  items-center hover:bg-gray-900 p-3 px-4 md:px-8 my-3 rounded-r-full ${
                activeTab === item.name ? "bg-gray-900" : ""
              }`}
            >
              <div className={`flex gap-5 justify-center items-center `}>
                <div
                  className={` ${
                    item.name === "Settings"
                      ? "hover:animate-spin"
                      : "hover:animate-pulse"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="hidden md:block">{item.name}</div>
              </div>
              {item.color && (
                <div
                  className={` justify-center items-center hidden md:flex rounded-full w-5 h-5 ${item.color} `}
                >
                  {item.count}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default SidePanel;
