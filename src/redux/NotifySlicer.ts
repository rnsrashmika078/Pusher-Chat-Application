"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type MessageType = {
  c_id: string;
  from: string;
  senderId: string;
  message: string;
  status: string;
  targetUserId: string;
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
  RequestData: MessageType | null;
}

const initialState: Params = {
  notify: { message: "", status: "", message_header: "" },
  simpleMessage: null,
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

    setRequestData: (state, action: PayloadAction<MessageType | null>) => {
      state.RequestData = action.payload;
    },
  },
});

export const {
  setNotify,
  setSimpleNotification,
  setRequestData,
  // removeFriendRequest,
} = nofifySlicer.actions;
export default nofifySlicer.reducer;
