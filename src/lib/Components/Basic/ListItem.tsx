"use client";
import React from "react";

interface ListItem extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
    variant?:
        | "default"
        | "outline"
        | "gradient"
        | "negative"
        | "positive"
        | "danger"
        | "windows";
    size?: "xs" | "sm" | "md" | "lg";
    radius?: "xs" | "md" | "xl" | "full";
    index?: number;
    active?: number;
}

const ListItem = ({
    active = 0,
    index = 0,
    name = "Click me",
    variant = "default",
    size = "md",
    radius = "xs",
    className,
    ...props
}: ListItem) => {
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        danger: "bg-red-500 text-white hover:bg-red-600",
        positive: "bg-red-500 text-white hover:bg-red-600",
        negative: "hover:bg-gray-700",
        outline: `${
            active == index
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-white hover:bg-gray-700"
        } border border-gray-400 hover:cursor-pointer`,
        gradient: "bg-gradient-animated text-white",
        windows: `border border-gray-400 text-gray-700  shadow-sm ${
            active == index
                ? "bg-gray-300 text-white"
                : "hover:bg-gray-300 bg-gray-200 hover:cursor-pointer hover:scale-105"
        }
        `,
    };

    const sizes = {
        xs: "px-2  py-1 text-xs",
        sm: "px-3  py-1 text-sm",
        md: "px-4 py-1 text-base",
        lg: "px-5  py-1 text-lg",
    };
    const radiuses = {
        xs: "rounded-xs",
        md: "rounded-md",
        xl: "rounded-xl",
        full: "rounded-full",
    };

    const style = `transition-all mt-1 mb-1  ${radiuses[radius]} ${variants[variant]} ${sizes[size]} ${className}`;
    return (
        <button className={`${style}`} {...props}>
            {name}
        </button>
    );
};

export default ListItem;
