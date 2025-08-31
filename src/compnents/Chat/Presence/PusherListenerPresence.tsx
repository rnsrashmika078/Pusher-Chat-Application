"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { Chat, Member } from "@/interface/Types";
import {
  joinedUser,
  leftUser,
  setLiveMessages,
  setOnlineUsers,
} from "@/src/redux/chatSlicer";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateLastSeen } from "@/src/server_side/actions/UserLastSeenServerAction";
// import Sonner from "../../Sonner/Sonner";

type MessageType = {
  from: string;
  senderId: string;
  message: string;
  targetUserId: string;
};

export default function PusherListenerPresence({
  user_id,
}: {
  user_id: string | undefined;
}) {
  // const [onlineUsers, setOnlineUsers] = useState<Member[]>([]);
  const dispatch = useDispatch<ReduxDispatch>();
  const onlineUsers = useSelector(
    (store: ReduxtState) => store.chat.onlineUsers
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

    const presenceChannel = pusher.subscribe("presence-users");
    const channel = pusher.subscribe(`presence-user-${user_id}`);
    presenceChannel.bind(
      "pusher:subscription_succeeded",
      (members: { members: Record<string, Member["info"]> }) => {
        console.log("Subscribed to presence-users, members:", members);
        const initialMembers = Object.entries(members.members).map(
          ([id, info]) => ({
            id,
            info,
          })
        );
        dispatch(setOnlineUsers(initialMembers));
        console.log("Initial online users:", initialMembers);
      }
    );

    presenceChannel.bind("pusher:member_added", (member: Member) => {
      // console.log("Member added:", member);
      const memberjoined = `${member.info.firstname} joined!`;
      console.log(memberjoined);
      dispatch(joinedUser(member));
    });

    presenceChannel.bind("pusher:member_removed", async (member: Member) => {
      const memberLeft = `${member.info.firstname} left!`;
      console.log(memberLeft);
      dispatch(leftUser(member));
      await updateLastSeen(member.id);
    });

    channel.bind("pusher:subscription_error", (error: MessageType) => {
      const errormessage = `Subscription error: ${error}`;
      console.log(errormessage);

      // <Sonner message={errormessage} />;
    });

    channel.bind("chat-history", (data: Chat) => {
      console.log("Friend request received:", data);
      dispatch(setLiveMessages(data));
      console.log("PUSHER MESSAGE ", data.message);
    });

    return () => {
      console.log("Unsubscribing from presence-users");
      pusher.unsubscribe(`presence-user-${user_id}`);
      pusher.disconnect();
    };
  }, [dispatch, user_id]);

  console.log("Online Users: ", onlineUsers);

  return null;
}
