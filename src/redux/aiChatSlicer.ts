"use client";
import { AiChat } from "@/interface/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  openChat: AiChat | null;
}

const initialState: PostState = {
  openChat: null,
};

const aiChatSlicer = createSlice({
  name: "aiChatSlicer",
  initialState,
  reducers: {
    setOpenChat: (state, action: PayloadAction<AiChat>) => {
      state.openChat = action.payload;
    },
  },
});

export const { setOpenChat } = aiChatSlicer.actions;
export default aiChatSlicer.reducer;
