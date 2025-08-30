import { getChatHistory } from "../server_side/actions/ChatHistoryServerAction";
import { getFriendsServerAction } from "../server_side/actions/FriendServerAction";
import {
  // DeleteFriendRequest,
  GetFriendRequests,
} from "../server_side/actions/FriendsRequests";

export const friendRequestFetcher = async (userId: string) => {
  return await GetFriendRequests(userId);
};
export const allFriendsFetcher = async (userid: string) => {
  return await getFriendsServerAction(userid);
};
export const chatHistoryFetcher = async (
  userid: string | undefined,
  friendid: string | undefined
) => {
  return await getChatHistory(userid, friendid);
};

// export const deleteRequestFetcher = async (
//   userId: string,
//   targetId: string
// ) => {
//   return await DeleteFriendRequest(userId, targetId);
// };
