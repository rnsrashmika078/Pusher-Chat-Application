import React from "react";
import Section from "./Section";
const LandingPage = () => {
  return (
    <div>
      {[
        {
          sectionId: 1,
          header: "Instant Conversations, Anytime",
          subHeader:
            "Experience lightning-fast messaging powered by Next.js, Pusher, and MongoDB",
          image: "aichat.gif",
          button: "Get Started",
          color: "bg-white",
        },
        {
          sectionId: 2,
          header: "Why Choose Us",
          subHeader: "Powerfull Library made on top of React",
          image: "aichat2.gif",
          benefits: [
            {
              header: "💬 Real-Time Messaging",
              content: "Messages delivered instantly, no refresh needed.",
            },
            {
              header: "👀 Online Presence",
              content: "Messages stored safely with end-to-end architecture.",
            },
            {
              header: "🎨 Modern UI",
              content: "Send messages, share files, stay in sync.",
            },
          ],
          color: "bg-white",
        },
        {
          sectionId: 3,
          header: "Chat Made Simple",
          subHeader: "AI helps to get idea about your resume",
          image: "aichat.gif",
          steps: [
            {
              header: "1. Sign Up / Log In",
              content: "Create your account in seconds.",
            },
            {
              header: "2. Find Friends",
              content: "Connect with people instantly.",
            },
            {
              header: "3. Start Chatting",
              content: "Send messages, share files, stay in sync.",
            },
          ],
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
            button={section.button}
            image={section.image}
            benefits={section.benefits}
            steps={section.steps}
          />
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
