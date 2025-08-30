"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LastMessage = {
  id: string;
  message: string;
};
interface PostState {
  lastMessage: LastMessage[];
}
const initialState: PostState = {
  lastMessage: [],
};

const lastMessageSlicer = createSlice({
  name: "lastMessageSlicer",
  initialState,
  reducers: {
    setLastMessage: (state, action: PayloadAction<LastMessage[]>) => {
      state.lastMessage = action.payload;
    },
  },
});

export const { setLastMessage } = lastMessageSlicer.actions;
export default lastMessageSlicer.reducer;
