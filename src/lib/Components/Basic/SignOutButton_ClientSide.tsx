"use client";
import { signOut } from "next-auth/react";
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
}

const SignOutButton_ClientSide = ({
    name = "Sign Out",
    variant = "negative",
    size = "md",
    radius = "xs",
    className,
    ...props
}: ButtonProps) => {
    const variants = {
        default:
            "bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer hover:scale-105",
        danger: "bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer hover:scale-105",
        positive:
            "bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer hover:scale-105",
        negative:
            "bg-gray-500 text-white hover:bg-gray-700 hover:cursor-pointer hover:scale-105",
        dark: "bg-gray-900 text-white hover:bg-gray-700 hover:cursor-pointer hover:scale-105",
        outline:
            "border border-gray-400 text-white hover:bg-black hover:cursor-pointer hover:scale-105",
        gradient:
            "bg-gradient-animated text-white hover:cursor-pointer hover:scale-105",
        windows: `border border-gray-300 text-gray-600 hover:cursor-pointer hover:scale-105  ${
            props.disabled
                ? "bg-gray-300 text-white"
                : "hover:bg-gray-300 bg-gray-200 hover:cursor-pointer hover:scale-105"
        }`,
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

    const style = `transition-all mt-1 shadow-sm ${radiuses[radius]} ${variants[variant]} ${sizes[size]} ${className}`;
    return (
        <button
            className={`${style}`}
            {...props}
            onClick={() => signOut({ callbackUrl: "/signs" })}
        >
            {name}
        </button>
    );
};

export default SignOutButton_ClientSide;
