"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Chat,
  Conversation,
  Friend,
  Member,
  StartChat,
} from "@/interface/Types";
import { Channel } from "pusher-js";
import { GroupMessage, Groups } from "../types";

type LastMessageState = {
  [conversationId: string]: string;
  status: string;
};
type SeenMessage = {
  messageId: string;
  conversationId: string;
  seen: boolean;
};
interface PostState {
  ws: WebSocket | null;
  startChat: StartChat | null;
  seenMessageStatus: SeenMessage | null;
  activeTab: string;
  settingsActiveTab: string;
  liveMessages: Chat[];
  createdAt?: string;
  wholeChat: Chat[];
  lastMessage: LastMessageState;
  chatWith: Friend | null;
  onlineUsers: Member[];
  pusherChannel: Channel | null;
  groupChat: Groups | null;
  groupLiveMessages: GroupMessage | null;
  friends: Conversation[];
}
const initialState: PostState = {
  ws: null,
  chatWith: null,
  groupChat: null,
  activeTab: "Inbox",
  settingsActiveTab: "General",
  liveMessages: [],
  wholeChat: [],
  lastMessage: { status: "" },
  startChat: null,
  onlineUsers: [],
  pusherChannel: null,
  seenMessageStatus: null,
  groupLiveMessages: null,
  friends: [],
};
const chatSlicer = createSlice({
  name: "chatSlicer",
  initialState,
  reducers: {
    setStartChat: (state, action: PayloadAction<StartChat | null>) => {
      state.startChat = action.payload;
    },
    setGroupChat: (state, action: PayloadAction<Groups | null>) => {
      state.groupChat = action.payload;
    },
    setChatWith: (state, action: PayloadAction<Friend | null>) => {
      state.chatWith = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setSettingsActiveTab: (state, action: PayloadAction<string>) => {
      state.settingsActiveTab = action.payload;
    },
    setWebSocket: (state, action: PayloadAction<WebSocket>) => {
      state.ws = action.payload;
    },
    setLiveMessages: (state, action: PayloadAction<Chat>) => {
      state.liveMessages.push(action.payload);
    },
    setGroupLiveMessage: (
      state,
      action: PayloadAction<GroupMessage | null>
    ) => {
      state.groupLiveMessages = action.payload;
    },
    setSeenMessageStatus: (
      state,
      action: PayloadAction<SeenMessage | null>
    ) => {
      state.seenMessageStatus = action.payload;
    },
    clearLiveMessages: (state) => {
      state.liveMessages = [];
    },
    setWholeChat: (state, action: PayloadAction<Chat[]>) => {
      state.wholeChat = action.payload;
    },
    setLastMessage: (
      state,
      action: PayloadAction<{
        conversationId: string;
        message: string;
        status: string;
      }>
    ) => {
      state.lastMessage[action.payload.conversationId] = action.payload.message;
    },
    setFriends: (state, action: PayloadAction<Conversation[]>) => {
      state.friends = action.payload;
    },

    setOnlineUsers: (state, action: PayloadAction<Member[]>) => {
      state.onlineUsers = action.payload;
    },
    // presence channel
    setPusherChannel: (state, action: PayloadAction<Channel>) => {
      state.pusherChannel = action.payload;
    },
    joinedUser: (state, action: PayloadAction<Member>) => {
      const exist = state.onlineUsers.some(
        (user) => user.id === action.payload.id
      );
      if (!exist) {
        state.onlineUsers.push(action.payload);
      }
    },
    leftUser: (state, action: PayloadAction<Member>) => {
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user.id !== action.payload.id
      );
    },
  },
});

export const {
  setStartChat,
  setGroupChat,
  setFriends,
  setWebSocket,
  setActiveTab,
  setSettingsActiveTab,
  setLiveMessages,
  clearLiveMessages,
  setWholeChat,
  setSeenMessageStatus,
  setChatWith,
  setLastMessage,
  setPusherChannel,
  joinedUser,
  setOnlineUsers,
  leftUser,
  setGroupLiveMessage,
} = chatSlicer.actions;

export default chatSlicer.reducer;
