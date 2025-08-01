
import ChatLayout from "@/src/compnents/Chat/ChatLayout";
import React from "react";

const page = async () => {
  // const session = await getServerSession(authOptions);

  return (
    <div>
      <ChatLayout emails={[]} />
    </div>
  );
};

export default page;
