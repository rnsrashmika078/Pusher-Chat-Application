"use client";
import Theme from "@/src/lib/Components/Advanced/Theme/Theme";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { GoBell } from "react-icons/go";

const MobileView = ({ toggle }: { toggle: boolean }) => {
    const navitems = [
        { item: "Home" },
        { item: "Profile" },
        { item: <GoBell size={20}/> },
        { item: <Theme /> },
    ];
    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1, // 1 = forward, -1 = reverse
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.3,
                staggerDirection: -1, // animate out in reverse
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
    };
    return (
        <AnimatePresence>
            {toggle && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-3 -z-50"
                >
                    <div className=" flex justify-between gap-5 items-center ">
                        {navitems.map((item, index) => (
                            <motion.div
                                variants={itemVariants}
                                key={index}
                                className="text-gray-500 hover:cursor-pointer select-none hover:text-gray-300"
                            >
                                {item.item}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileView;
