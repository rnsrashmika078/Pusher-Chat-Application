"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import {
  setFriendRequest,
  setRequestData,
  setSimpleNotification,
} from "@/src/redux/NotifySlicer";
import AddFriend from "@/src/server_side/actions/FriendsRequests";
import { data } from "framer-motion/client";
import { Friend, FriendRequest } from "@/interface/Types";

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
  const friendRequests = useSelector(
    (store: ReduxtState) => store.notify.friendRequest
  );

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
      dispatch(
        setRequestData({
          from: data.from,
          senderId: user_id!,
          message: `🔔 New Friend request. You have friend request from ${data.from}`,
        })
      );
      const exists =
        friendRequests &&
        friendRequests.some(
          (req) =>
            req.from === data.from &&
            req.senderId === user_id &&
            req.targetUserId === data.senderId
        );

      if (!exists) {
        const msg = `🔔 New Friend request. You have friend request from ${data.from}`;
        const notifiedTime: number =
          Date.now() + Math.floor(Math.random() * 1000000);

        dispatch(
          setSimpleNotification({
            message: msg,
            id: notifiedTime,
          })
        );
      } else {
        console.log("Duplicate friend request — dispatch skipped.");
      }
    });

    return () => {
      pusher.unsubscribe(`private-user-${user_id}`);
    };
  }, [dispatch, friendRequests, user_id]);

  return null;
}
