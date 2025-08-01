import { setChatWith } from "@/src/redux/chatSlicer";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import ChatSettings from "./ChatSettings";
const ChatListPanel = ({ toggle }: { toggle: boolean }) => {
  const friends = [
    {
      email: "rnsrashmika078@gmail.com",
      firstname: "Rashmika",
      lastname: "Siriwardhana",
      profilePicture: "https://localhost:3000/api",
      lastmessage: "I will take over🤣",
      recievedtime: "3:25 PM",
      unread: 12,
    },
    {
      email: "mahela@gmail.com",
      firstname: "Mahela",
      lastname: "Jayawardhana",
      lastmessage: "This is the best time to take over the shit out of it🤌",
      recievedtime: "7:51 AM",
      unread: 6,
    },
  ];
  const activeTab = useSelector((store: ReduxtState) => store.chat.activeTab);
  const dispatch = useDispatch<ReduxDispatch>();
  return (
    <div className="relative w-full select-none border-r border-gray-200 shadow-sm">
      {!toggle && (
        <div>
          <div className="flex justify-between shadow-sm p-15 bg-white py-6.5  ">
            <span>
              <RiMessage2Fill size={30} color="purple" />
            </span>
            <span>
              <IoCall size={30} color="purple" />
            </span>
            <span>
              <IoIosMail size={30} color="purple" />
            </span>

            <span>
              <FaPeopleGroup size={30} color="purple" />
            </span>
            <span>
              <Image
                src="https://randomuser.me/api/portraits/men/27.jpg"
                alt="Reviewer"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            </span>
          </div>

          <div className="sticky  bg-white p-5 shadow-sm mt-1">
            <h1 className="text-4xl font-bold mb-2">{activeTab || "Chat"}</h1>
            {activeTab !== "Settings" ? (
              <>
                <div className="flex gap-2 p-2 text-xs font-bold justify-start items-start">
                  <p>DIRECT</p>
                  <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
                  <p className="text-gray-300">GROUP</p>
                  <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
                  <p className="text-gray-300">PUBLIC</p>
                  <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
                </div>
                <input
                  placeholder="Search"
                  className="mb-2 border shadow-sm rounded-2xl p-2 pl-5 w-full bg-gray-100 border-gray-200"
                ></input>
              </>
            ) : null}
          </div>
          {activeTab !== "Settings" ? (
            <div className="p-5">
              {/* <ChatSettings /> */}

              {friends.map((friend, index) => (
                <div
                  key={index}
                  className="flex gap-3 mt-2 bg-white p-3 rounded-2xl shadow-sm"
                  onClick={() => dispatch(setChatWith(friend))}
                >
                  <Image
                    src="https://randomuser.me/api/portraits/men/27.jpg"
                    alt="Reviewer"
                    width={10}
                    height={10}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="w-full">
                    <div className="flex justify-between items-center ">
                      <h1 className="font-bold">
                        {friend.firstname + " " + friend.lastname}
                      </h1>
                      <p className="text-xs text-gray-400 ">
                        {friend.recievedtime}
                      </p>
                    </div>
                    <div className="flex justify-between items-center ">
                      {/* whitespace-nowrap overflow-hidden text-ellipsis */}
                      <p className="text-sm text-gray-400 ">
                        {friend.lastmessage.length > 35
                          ? friend.lastmessage.slice(0, 35) + "....."
                          : friend.lastmessage}
                      </p>
                      <p className="flex justify-center items-center text-white text-sm bg-green-500 w-5 h-5 p-2 rounded-full">
                        {friend.unread}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ChatSettings />
          )}
        </div>
      )}
    </div>
  );
};
export default ChatListPanel;
