import { Conversation } from "@/interface/Types";
import { setChatWith, setStartChat } from "@/src/redux/chatSlicer";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { useSession } from "next-auth/react";
import { JSX } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiLoader2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
interface ChatListProps {
  isLoading: boolean;
  unseenCount?: { id: string; user: string; count: number }[];
  step?: number;
}
const ChatCard: React.FC<ChatListProps> = ({

  isLoading,
  unseenCount,
  step,
}) => {
  const dispatch = useDispatch<ReduxDispatch>();
  const { data: session } = useSession();
  const lastMessages = useSelector(
    (store: ReduxtState) => store.chat.lastMessage
  );
  const friends = useSelector((store: ReduxtState) => store.chat.friends);

  type MessageStatus = "sent" | "delivered" | "seen";

  const status: Record<MessageStatus, JSX.Element> = {
    sent: <IoCheckmarkDoneSharp />,
    delivered: <IoCheckmarkDoneSharp />,
    seen: <IoCheckmarkDoneSharp color="blue" />,
  };

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-5 animate-spin">
        <RiLoader2Fill size={25} />
      </div>
    );
  }

  return (
    <div className="relative p-5">
      {friends?.map((friend: Conversation, index: number) => (
        <div
          key={index}
          className="flex gap-3 mt-2 bg-[var(--card-background)] p-3 rounded-2xl shadow-sm"
          onClick={() => {
            dispatch(
              setStartChat({
                id: friend.conversationId!,
                firstName: friend.otherUserFname!,
                lastName: friend.otherUserLName!,
                recieverId: friend.otherUserId,
              })
            );
            dispatch(setChatWith(null));
          }}
        >
          <Image
            src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
            alt="Reviewer"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h1 className="font-bold">
                {friend.otherUserFname + " " + friend.otherUserLName}
              </h1>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-1">
                <p>{status[friend.status as MessageStatus]}</p>
                <p className="text-sm text-gray-400">
                  {lastMessages[friend.conversationId] ||
                    friend.lastMessage ||
                    "No messages yet"}
                </p>
              </div>

              {(() => {
                const unseen = unseenCount?.find(
                  (u) => u.id === friend.otherUserId
                );

                if (unseen && unseen.id !== session?.user?._id) {
                  return (
                    <span className="flex justify-center items-center text-[var(--background)] text-sm bg-green-500 w-5 h-5 p-2 rounded-full">
                      {step === 0 ? unseen.count - 1 : unseen.count}
                    </span>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatCard;
