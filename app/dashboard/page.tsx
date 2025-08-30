import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function page() {
  const session = await getServerSession(authOptions);
  return <div className="">{session?.user.name}</div>;
}
