"use client";

export default function SendRequestButton({ targetId }: { targetId: string }) {
  const sendRequest = async () => {
    try {
      const res = await fetch("/api/private-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: targetId,
          message: "Hey, let's be friends!",
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
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={sendRequest}
    >
      Send Request
    </button>
  );
}
