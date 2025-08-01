"use client";
import React, { useEffect, useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  },[]);

  const color =
    progress > 25
      ? progress > 50
        ? "bg-green-500 "
        : "bg-blue-500"
      : "bg-red-500";
  return (
    <div>
      <div className="flex justify-center items-center">{progress} %</div>
      <div className="w-full h-5 border rounded-sm border-gray-200 ">
        <div
          className={` h-full ${color} transition-all`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
