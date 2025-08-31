import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
export default async function page() {
  const session = await getServerSession(authOptions);
  return <div className="">{session?.user.name}</div>;
}
