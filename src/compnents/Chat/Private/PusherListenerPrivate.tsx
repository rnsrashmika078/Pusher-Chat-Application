"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";
import { ReduxDispatch } from "@/src/redux/store";
import { setSimpleNotification } from "@/src/redux/NotifySlicer";

type MessageType = {
  from: string;
  senderId: string;
  message: string;
};

export default function PusherListenerPrivate({
  user_id,
}: {
  user_id: string | null;
}) {
  const dispatch = useDispatch<ReduxDispatch>();
  useEffect(() => {
    if (!user_id) {
      console.log("No user_id, skipping Pusher setup");
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`private-user-${user_id}`);

    channel.bind("pusher:subscription_succeeded", () => {
      // console.log(`Subscribed to private-user-${user_id}`);
    });

    channel.bind("pusher:subscription_error", (error: MessageType) => {
      // console.error("Subscription error:", error);
    });

    channel.bind("friend-request", (data: MessageType) => {
      // alert(`🔔 Friend request from ${data.from}: ${data.message}`);
      const msg = `🔔 New Friend request. You have friend request from ${data.from}`;
      dispatch(
        setSimpleNotification({
          message: msg,
          id: Date.now() + Math.floor(Math.random() * 1000000),
        })
      );
    });

    return () => {
      console.log(`Unsubscribing from private-user-${user_id}`);
      pusher.unsubscribe(`private-user-${user_id}`);
    };
  }, [user_id]);

  return null;
}
