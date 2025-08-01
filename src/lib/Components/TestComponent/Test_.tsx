"use client";
import React, { useState } from "react";
import "./test.css";
import { AnimatePresence } from "framer-motion";
const Test_ = () => {
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  return (
    <div className="p-5 w-fit">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {mouseEnter ? "MOUSE HAS ENTERED" : "MOUSE NOT ENTERED YET"}
      </div>
      <div
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {mouseEnter ? (
          <FrontSide mouseEnter={mouseEnter} />
        ) : (
          <BackSide mouseEnter={mouseEnter} />
        )}
      </div>
    </div>
  );
};

export default Test_;

const BackSide = ({ mouseEnter }: { mouseEnter: boolean }) => {
  return (
    <AnimatePresence>
      <div className="back">
        <div
          className={`transition-all ${
            !mouseEnter && "rotate-y-360"
          } bg-image flex flex-col justify-between h-[150px] border w-fit rounded-2xl p-5 border-[var(--border)] shadow-sm `}
        >
          <h1 className="text-xl font-bold shadow-xl">Front Side</h1>
          <p>This is the front side of the card</p>
        </div>
      </div>
    </AnimatePresence>
  );
};
const FrontSide = ({ mouseEnter }: { mouseEnter: boolean }) => {
  return (
    <AnimatePresence>
      <div className="front">
        <div
          className={`${
            mouseEnter ? "hover:rotate-y-360" : "hover:rotate-y-0"
          } transition-all  bg-image flex flex-col justify-between h-[150px] border w-fit rounded-2xl p-5 border-[var(--border)] shadow-sm `}
        >
          <h1 className="text-xl font-bold shadow-xl">Back Side</h1>
          <p>This is the back size of the card</p>
        </div>
      </div>
    </AnimatePresence>
  );
};
