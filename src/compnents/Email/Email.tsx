import React from "react";
import EmailLayout from "./EmailLayout";
import { GetEmails } from "@/src/server_side/actions/RetrieveEmails";

export default async function Email() {
  const emails = await GetEmails();

  return (
    <div>
      <EmailLayout emails={emails} />
    </div>
  );
}
