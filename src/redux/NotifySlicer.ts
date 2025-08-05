"use client";

import { FriendRequest } from "@/interface/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type MessageType = {
  from: string;
  senderId: string;
  message: string;
};

interface Notify {
  message: string;
  status: string;
  message_header: string;
}

interface SimpleMessage {
  message: string;
  id: number;
}

interface Params {
  notify: Notify;
  simpleMessage: SimpleMessage | null;
  friendRequest: FriendRequest[] | null;
  RequestData: MessageType | null;
}

const initialState: Params = {
  notify: { message: "", status: "", message_header: "" },
  simpleMessage: null,
  friendRequest: [],
  RequestData: null,
};

const nofifySlicer = createSlice({
  name: "nofifySlicer",
  initialState,

  reducers: {
    setNotify: (state, action: PayloadAction<Notify>) => {
      state.notify = action.payload;
    },
    setSimpleNotification: (
      state,
      action: PayloadAction<SimpleMessage | null>
    ) => {
      state.simpleMessage = action.payload;
    },
    setFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequest?.push(action.payload);
    },
    setRequestData: (state, action: PayloadAction<MessageType | null>) => {
      state.RequestData = action.payload;
    },
  },
});

export const {
  setNotify,
  setSimpleNotification,
  setFriendRequest,
  setRequestData,
} = nofifySlicer.actions;
export default nofifySlicer.reducer;
