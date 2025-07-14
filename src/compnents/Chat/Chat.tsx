import React from "react";
import { GetEmails } from "@/src/server_side/actions/RetrieveEmails";
import ChatLayout from "./ChatLayout";

export default async function Chat() {
  const emails = await GetEmails();

  return (
    <div>
      <ChatLayout emails={emails} />
    </div>
  );
}
