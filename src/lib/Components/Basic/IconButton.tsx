"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  variant?:
    | "default"
    | "outline"
    | "gradient"
    | "negative"
    | "positive"
    | "danger"
    | "windows"
    | "dark";
  size?: "xs" | "sm" | "md" | "lg";
  radius?: "xs" | "md" | "xl" | "full";
  children?: React.ReactNode;
}

const IconButton = ({ className, children, name, ...props }: ButtonProps) => {
  // const variants = {
  //   default:
  //     "bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer hover:shadow-md transition",
  //   danger:
  //     "bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer hover:shadow-md transition",
  //   positive:
  //     "bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer hover:shadow-md transition",
  //   negative:
  //     "bg-gray-500 text-white hover:bg-gray-700 hover:cursor-pointer hover:shadow-md transition",
  //   dark: "bg-gray-900 text-white hover:bg-gray-700 hover:cursor-pointer hover:shadow-md transition",
  //   outline:
  //     "border border-gray-400 text-white hover:bg-black hover:cursor-pointer hover:shadow-md transition",
  //   gradient:
  //     "bg-gradient-animated text-white hover:cursor-pointer hover:shadow-md transition",
  //   windows: `border border-gray-300 text-gray-600 hover:cursor-pointer hover:shadow-md transition  ${
  //     props.disabled
  //       ? "bg-gray-300 text-white"
  //       : "hover:bg-gray-300 bg-gray-200 hover:cursor-pointer hover:shadow-md transition"
  //   }`,
  // };

  // const sizes = {
  //   xs: "px-2  py-1 text-xs",
  //   sm: "px-3  py-1 text-sm",
  //   md: "px-4 py-1 text-base",
  //   lg: "px-5  py-1 text-lg",
  // };
  // const radiuses = {
  //   xs: "rounded-xs",
  //   md: "rounded-md",
  //   xl: "rounded-xl",
  //   full: "rounded-full",
  // };

  const style = `text-white rounded-full flex text-xs gap-1 bg-blue-500 p-2 justify-center items-center w-40 py-3 shadow-sm hover:cursor-pointer hover:bg-blue-400 transition-all ${className}`;
  return (
    <div className="px-5 py-5 -mb-5">
      <button className={`${style}`} {...props}>
        {children}
        {name}
      </button>
    </div>
  );
};

export default IconButton;
