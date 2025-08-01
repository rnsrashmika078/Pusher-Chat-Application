"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
const Section = ({
  header,
  subHeader,
  image,
  color,
}: {
  header: string;
  subHeader: string;
  image: string;
  color: string;
}) => {
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.3,
        staggerDirection: -1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  };
  const itemVariants2 = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: -25, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const motionControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      motionControls.start("visible");
      textControls.start("visible");
    } else {
      motionControls.start("hidden");
      textControls.start("hidden");
    }
  }, [isInView, motionControls, textControls]);
  return (
    <section ref={ref}>
      <motion.div
        animate={textControls}
        initial="hidden"
        variants={containerVariants}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex justify-center items-center mb-10 text-xs sm:text-xs md:text-xl lg:text-xl xl:text-xl gap-5"
      >
        {[
          { text: "Next JS", color: "blue" },
          { text: "React JS", color: "red" },
          { text: "Typescript", color: "green" },
          { text: "Redux", color: "purple" },
        ].map((icon, index) => (
          <motion.div
            variants={itemVariants}
            key={index}
            className={`border rounded-xl p-2 border-gray-300  text-white font-bold`}
            style={{ backgroundColor: `${icon.color}` }}
          >
            {icon.text}
          </motion.div>
        ))}
      </motion.div>
      <div className="flex">
        <motion.div
          animate={textControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.8 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`space-y-2 flex flex-row justify-center items-center`}
        >
          <div>
            <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold">
              {header}
            </h1>
            <p className="text-xs sm:text-xs md:text-sm lg:text-xl xl:text-xl">
              {subHeader}
            </p>
          </div>
        </motion.div>
        <motion.div
          animate={motionControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.8 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image src={`/${image}`} width={350} height={350} alt="ai" />
        </motion.div>
      </div>
      <motion.div
        animate={textControls}
        initial="hidden"
        variants={containerVariants}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex justify-center items-center mt-10 text-sm sm:text-sm md:text-xl lg:text-xl xl:text-xl gap-5"
      >
        <motion.div variants={itemVariants2}>
          {"Powered by Node JS"}
        </motion.div>
      </motion.div>
    </section>
  );
};
export default Section;
