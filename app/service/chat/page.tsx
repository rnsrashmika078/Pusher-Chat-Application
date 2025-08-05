import ChatLayout from "@/src/compnents/Chat/ChatLayout";
import React from "react";
import GetAllUsers from "@/src/server_side/actions/GetAllUsers";

const page = async () => {
  // const session = await getServerSession(authOptions);
  const allUsers = await GetAllUsers();

 

  return (
    <div>
      <ChatLayout allUsers={allUsers} />
    </div>
  );
};

export default page;
