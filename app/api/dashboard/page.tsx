import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../auth/[...nextauth]/route";
import SignOutButton_ClientSide from "@/src/lib/Components/Basic/SignOutButton_ClientSide";

export default async function page() {
  const session = await getServerSession(authOptions);
  return (
    <div className="">
      {session?.user.username}
      <SignOutButton_ClientSide />
      {JSON.stringify(session?.user._id || {})}
    </div>
  );
}
