"use client";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
// import Sonner from "../../Sonner/Sonner";

type MessageType = {
  from: string;
  senderId: string;
  message: string;
  targetUserId: string;
};

type Member = {
  id: string;
  info: { firstname: string; lastname: string };
};

export default function PusherListenerPresence({
  user_id,
}: {
  user_id: string | null;
}) {
  const [onlineUsers, setOnlineUsers] = useState<Member[]>([]);

  useEffect(() => {
    if (!user_id) {
      console.log("No user_id, skipping Pusher setup");
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`presence-users`);

    channel.bind(
      "pusher:subscription_succeeded",
      (members: { members: Record<string, Member["info"]> }) => {
        console.log("Subscribed to presence-users, members:", members);
        const initialMembers = Object.entries(members.members).map(
          ([id, info]) => ({
            id,
            info,
          })
        );
        setOnlineUsers(initialMembers);
        console.log("Initial online users:", initialMembers);
      }
    );

    channel.bind("pusher:member_added", (member: Member) => {
      // console.log("Member added:", member);
      const memberjoined = `${member.info.firstname} joined!`;
      // <Sonner message={memberjoined} />;
      // alert(`Member Added: ${member.info.firstname} ${member.info.lastname}`);
      setOnlineUsers((prev) => [...prev, member]);
    });

    channel.bind("pusher:member_removed", (member: Member) => {
      const memberLeft = `${member.info.firstname} left!`;
      // <Sonner message={memberLeft} />;
      // alert(`Member Removed: ${member.info.firstname} ${member.info.lastname}`);
      setOnlineUsers((prev) => prev.filter((m) => m.id !== member.id));
    });

    channel.bind("pusher:subscription_error", (error: MessageType) => {
      const errormessage = `Subscription error: ${error}`;
      // <Sonner message={errormessage} />;
    });

    // channel.bind("friend-request", (data: MessageType) => {
    //   console.log("Friend request received:", data);
    //   alert(`🔔 Friend request from ${data.from}: ${data.message}`);
    // });

    return () => {
      console.log("Unsubscribing from presence-users");
      pusher.unsubscribe("presence-users");
      pusher.disconnect();
    };
  }, [user_id]);

  return (
    <div>
      {onlineUsers.map((user) => (
        <li key={user.id}>{user.info.firstname}</li>
      ))}
    </div>
  );
}
