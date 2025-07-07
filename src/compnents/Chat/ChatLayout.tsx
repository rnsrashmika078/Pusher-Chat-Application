"use client";
import React, { useState } from "react";
import MessageArea from "./MessageArea";
import LeftPanel from "./LeftPanel";
import TopBar from "./TopBar";

const ChatLayout = () => {
    const [type, setType] = useState<{
        btnType: string;
        leftButtonToggle: boolean;
    }>({
        btnType: "",
        leftButtonToggle: false,
    });

    return (
        <div className={`flex flex-col h-screen bg-gray-100`}>
            <TopBar />
            <div className={`flex-grow flex flex-row min-h-0 mt-18`}>
                {/* Left */}
                <div
                    className={`transition-all ${
                        type?.leftButtonToggle
                            ? "flex-3 sm:flex-3 md:flex-3"
                            : "flex-0 sm:flex-0 md:flex-0"
                    } lg:flex-1 overflow-y-auto h-full`}
                >
                    <LeftPanel />
                </div>
                {/* Center */}
                <div
                    className={`transition-all flex ${
                        type?.leftButtonToggle ? "flex-0" : "flex-2"
                    }  overflow-y-auto `}
                >
                    <MessageArea setType={setType} type={type} />
                </div>
                {/* Right */}
                {/* <div
                    className={`transition-all ${
                        type?.rightButtonToggle ? "flex-3" : "flex-0"
                    } sm:flex-0 md:flex-1 lg:flex-1 overflow-y-auto h-full `}
                >
                    <RightPanel />
                </div> */}
            </div>
        </div>
    );
};

export default ChatLayout;
