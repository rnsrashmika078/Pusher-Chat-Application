"use client";
import Theme from "@/src/lib/Components/Advanced/Theme/Theme";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import MobileView from "./MobileView";
import { motion } from "framer-motion";

const NavBar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const navitems = [
    { item: "Home" },
    { item: "Dashboard" },
    { item: "Profile" },
    { item: <Theme /> },
  ];
  const itemVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  };
  return (
    // 4rem = 64px = 16 tailwind points
    <div className=" z-[9999] h-[4rem] flex justify-between p-5 sticky top-0  select-none shadow-2xs bg-[var(--navbar)]">
      <h1 className="text-2xl">AI</h1>
      <div className="hidden sm:flex justify-between gap-5 items-center">
        {navitems.map((item, index) => (
          <div
            key={index}
            className="text-gray-500 hover:cursor-pointer select-none hover:text-gray-300 transition-all duration-200"
          >
            {item.item}
          </div>
        ))}
      </div>
      <div className="transition-all flex sm:hidden">
        <CiMenuBurger
          size={20}
          color="gray"
          onClick={() => setToggle((prev) => !prev)}
        />

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-[var(--mobile-nav)] fixed top-18 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 rounded-full "
        >
          <MobileView toggle={toggle} />
        </motion.div>
      </div>
    </div>
  );
};

export default NavBar;
