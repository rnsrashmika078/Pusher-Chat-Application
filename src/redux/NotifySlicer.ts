"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Params {
  notify: Notify;
  simpleMessage: SimpleMessage | null;
}
interface Notify {
  message: string;
  status: string;
  message_header: string;
}

interface SimpleMessage {
  message: string;
  id: number;
}

const initialState: Params = {
  notify: { message: "", status: "", message_header: "" },
  simpleMessage: null,
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
  },
});

export const { setNotify, setSimpleNotification } = nofifySlicer.actions;
export default nofifySlicer.reducer;
