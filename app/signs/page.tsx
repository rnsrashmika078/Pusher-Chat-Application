import SignForms from "@/src/compnents/Signs/SignForms";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
const page = async () => {
  const session = await getServerSession();
  return (
    <div className="h-screen">
      {!session?.user ? <SignForms /> : redirect("/service/chat")}
    </div>
    // <SignForms />
  );
};

export default page;
