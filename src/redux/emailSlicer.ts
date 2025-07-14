"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmailType } from "../types";
interface PostState {
  currentInbox: EmailType | null;
}

const initialState: PostState = {
  currentInbox: null,
};

const emailSlicer = createSlice({
  name: "emailSlicer",
  initialState,
  reducers: {
    setCurrentInbox: (state, action: PayloadAction<EmailType>) => {
      state.currentInbox = action.payload;
    },
  },
});

export const { setCurrentInbox } = emailSlicer.actions;
export default emailSlicer.reducer;
