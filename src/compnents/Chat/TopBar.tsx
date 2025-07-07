import React from "react";
import Image from "next/image";
const TopBar = () => {
    return (
        <div className="fixed z-900 w-full  overflow-hidden justify-center items-center">
            <div className="flex justify-between p-5 bg-white mb-2">
                <h1 className="text-black font-bold text-xl">
                    OZONE AI - Chat
                </h1>
                <h1 className="text-gray-400">Create memorable talks</h1>
            </div>
        </div>
    );
};

export default TopBar;
