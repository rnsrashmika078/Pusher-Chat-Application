"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
// import { setChatWith } from "../../../../redux/chatSlicer";
import { setChatWith } from "@/src/redux/chatSlicer";
// 😍👌❤️👹🎴🪄🧩
const LeftPanel = () => {
    const dispatch = useDispatch<ReduxDispatch>();
    const chat = useSelector((store: ReduxtState) => store.chat);
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
            lastmessage:
                "This is the best time to take over the shit out of it🤌",
            recievedtime: "7:51 AM",
            unread: 6,
        },
        {
            email: "kumar@gmail.com",
            firstname: "Kumar",
            lastname: "Sangakkara",
            lastmessage: "I hit a 100 century today☠️",
            recievedtime: "1:53 PM",
            unread: 2,
        },
        // {
        //     username: "Angelo Mathews",
        //     lastMessage: "Thanks for wishes man!🤗",
        //     time: "9:12 PM",
        //     unread: 1,
        // },
        // {
        //     username: "Kusal Perara",
        //     lastMessage: "Thats a banger bro...🎀",
        //     time: "6:43 AM",
        //     unread: 5,
        // },
        // {
        //     username: "Sanath Jayasuriya",
        //     lastMessage: "Remeber my power hitting🤣",
        //     time: "12:25 PM",
        //     unread: 5,
        // },
    ];
    return (
        <div className="flex flex-col w-full select-none justify-between border-r border-gray-200 ">
            <div className="flex justify-between shadow-sm p-4 sticky top-0 bg-white py-6.5 ">
                <span>Message</span>
                <span>Call</span>
                <span>Inbox</span>
                <span>Groups</span>
                <span>PImage</span>
            </div>
            <div className="">
                <div className="sticky top-20 bg-white p-5 shadow-sm">
                    <h1 className="text-4xl font-bold">Chats</h1>
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
                </div>
                {/* Friends */}
                <div className="p-5">
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
                                        {friend.firstname +
                                            " " +
                                            friend.lastname}
                                    </h1>
                                    <p className="text-xs text-gray-400 ">
                                        {friend.recievedtime}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center ">
                                    {/* whitespace-nowrap overflow-hidden text-ellipsis */}
                                    <p className="text-sm text-gray-400 ">
                                        {friend.lastmessage.length > 35
                                            ? friend.lastmessage.slice(0, 35) +
                                              "....."
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
            </div>
        </div>
    );
};
export default LeftPanel;
