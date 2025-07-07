"use client";
import React, { useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

interface SonnerProps {
    message: string | null;
}
const Sonner = ({ message }: SonnerProps) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!message) return;

        setShow(true);
        const timer = setTimeout(() => setShow(false), 3000);

        return () => clearTimeout(timer);
    }, [message]); // <== watch message

    return (
        <div>
            <AnimatePresence>
                {message && message.length > 0 && show && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 50, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-96 fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[var(--input-border)] p-3 rounded-xl bg-[var(--sonner-background)]"
                    >
                        <>
                            <div className="flex justify-between">
                                <div>
                                    <h1>{message.split(".")[0]}</h1>
                                    <span className="text-[var(--secondary-color)] ">
                                        {message.split(".")[1]}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <button className="b">
                                        <CiSquareRemove
                                            size={40}
                                            color="red"
                                            onClick={() => setShow(false)}
                                            className="hover:cursor-pointer"
                                        />
                                    </button>
                                </div>
                            </div>
                        </>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sonner;
