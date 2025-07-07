"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../../Basic/Button";
import { useSelector } from "react-redux";
import { ReduxtState } from "@/src/redux/store";
interface MessageBody {
    time: string;
    username: string;
    message: string;
}
interface MessageAreaProps {
    type: {
        btnType: string;
        leftButtonToggle: boolean;
    };
    setType: React.Dispatch<
        React.SetStateAction<{
            btnType: string;
            leftButtonToggle: boolean;
        }>
    >;
}
const MessageArea: React.FC<MessageAreaProps> = ({ type, setType }) => {
    const chat = useSelector((store: ReduxtState) => store.chat);
    const username = "Rashmika";
    const [typeMessage, setTypeMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageBody[]>([]);

    const handleMessages = (time: Date) => {
        if (typeMessage.length > 0) {
            setMessages([
                ...messages,
                {
                    username: username,
                    time: time.toLocaleTimeString(),
                    message: typeMessage,
                },
            ]);
        }

        setTypeMessage("");
    };
    return (
        <div className="flex w-full">
            {chat.chatWith ? (
                <div className="flex flex-col w-full select-none justify-between">
                    <div className="flex justify-between shadow-sm p-4 sticky top-0 bg-white">
                        <div className="flex gap-3">
                            <Image
                                src="https://randomuser.me/api/portraits/men/27.jpg"
                                alt="Reviewer"
                                width={10}
                                height={10}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h1 className="font-bold">
                                    {chat.chatWith?.firstname +
                                        " " +
                                        chat.chatWith?.lastname}
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Last seen 3 hours ago
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-5 justify-center items-center">
                            <span>Call</span>
                            <span>Video</span>
                            <span>More</span>
                        </div>
                    </div>

                    <Button
                        onClick={() =>
                            setType({
                                btnType: "left",
                                leftButtonToggle: !type.leftButtonToggle,
                            })
                        }
                        className="opacity-20 hover:opacity-100 fixed md:hidden p-2 px-4 shadow-sm rounded-2xl bg-purple-500 text-white top-40 left-5"
                    >
                        Left Panel
                    </Button>
                    {/* message area */}

                    <div className="p-5">
                        {messages[0]?.time && (
                            <div className="text-center">
                                <p className="text-gray-400">
                                    Today {messages[0]?.time}
                                </p>
                            </div>
                        )}
                        {messages.map((user, i) => (
                            <div
                                key={i}
                                className={`mb-1 flex ${
                                    user.username === username
                                        ? "justify-end "
                                        : "justify-start w-1/2"
                                } items-center`}
                            >
                                <p
                                    className={`${
                                        user.username === username
                                            ? "p-3 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 border shadow-sm border-gray-200 rounded-r-3xl rounded-bl-3xl mt-1 text-gray-200"
                                            : "p-3 bg-gray-200 rounded-3xl mt-1 text-gray-600 shadow-sm border border-gray-200"
                                    }`}
                                >
                                    {user.message}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between  gap-5 sticky bottom-0 p-3  bg-white shadow-2xl border-t border-gray-200">
                        <input
                            value={typeMessage}
                            onChange={(e) => setTypeMessage(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleMessages(new Date())
                            }
                            placeholder="Type a message here..."
                            className="border rounded-2xl p-2 pl-5 w-full bg-gray-100 border-gray-200"
                        ></input>

                        <Button
                            name="Send"
                            radius="full"
                            className="rounded-full bg-purple-500 text-white px-1 py-1 flex justify-center items-center"
                            onClick={() => handleMessages(new Date())}
                        >
                            Send
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default MessageArea;
