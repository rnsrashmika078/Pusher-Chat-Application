"use client";

import { ReactNode } from "react";

export default function SendRequestButton({
  targetId,
  children,
}: {
  targetId: string;
  children: ReactNode;
}) {
  const sendRequest = async () => {
    try {
      const res = await fetch("/api/private-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          c_id: targetId + targetId + new Date().getTime(),
          targetUserId: targetId,
          message: "🔔 New Friend request. You have friend request from ",
          status: "pending",
        }),
      });
      if (!res.ok) {
        console.error("Failed to send friend request:", await res.json());
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };
  return (
    <button
      type="button"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={sendRequest}
    >
      {children || "Send Friend Request"}
    </button>
  );
}
