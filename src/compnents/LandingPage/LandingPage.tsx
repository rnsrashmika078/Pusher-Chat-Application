import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Section from "./Section";
const LandingPage = () => {
  return (
    <div>
      {[
        {
          sectionId: 1,
          header: "Gear Up with AI",
          subHeader: "Handover your tasks to AI Today",
          image: "aichat.gif",
          color: "bg-white",
        },
        {
          sectionId: 2,
          header: "Level Up With Next JS",
          subHeader: "Powerfull Library made on top of React",
          image: "aichat2.gif",
          color: "bg-white",
        },
        {
          sectionId: 3,
          header: "Summarize Your Resume",
          subHeader: "AI helps to get idea about your resume",
          image: "aichat.gif",
          color: "bg-white",
        },
      ].map((section) => (
        <div
          key={section.sectionId}
          className={`flex justify-center items-center px-10 h-[calc(100vh-3rem)] ${section.color}`}
        >
          <Section
            color={section.color}
            header={section.header}
            subHeader={section.subHeader}
            image={section.image}
          />
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
