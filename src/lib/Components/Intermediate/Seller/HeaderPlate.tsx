import React from "react";

const HeaderPlate: React.FC<{ header: string }> = ({ header }) => {
  return (
    <div>
      <div className="relative flex justify-center items-center h-full mt-1 ">
        <div className="w-0 h-0 border-b-16 border-t-16 border-l-16 border-r-16 rotate-90 border-b-white border-r-[rgb(64,166,55)] border-l-[rgb(64,166,55)] border-t-[rgb(64,166,55)]"></div>
        <div className="bg-[rgb(64,166,55)] h-auto pb-1 font-type text-white py-2 p-2">
          {header || "Header Goes Here"}
        </div>
        <div className="w-0 h-0 border-b-16 border-t-16 border-l-16 border-r-16 -rotate-90 border-b-white border-r-[rgb(64,166,55)] border-l-[rgb(64,166,55)] border-t-[rgb(64,166,55)]"></div>
      </div>
    </div>
  );
};

export default HeaderPlate;
