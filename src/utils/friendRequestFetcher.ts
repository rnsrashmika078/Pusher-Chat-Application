import { GetFriendRequests } from "../server_side/actions/FriendsRequests";

export const friendRequestFetcher = async (userId: string) => {
  return await GetFriendRequests(userId);
};
