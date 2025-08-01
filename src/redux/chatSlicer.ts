"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Friend } from "@/interface/Types";
interface PostState {
  ws: WebSocket | null;
  chatWith: Friend | null;
  activeTab: string;
  settingsActiveTab: string;
}
const initialState: PostState = {
  ws: null,
  chatWith: null,
  activeTab: "Inbox",
  settingsActiveTab: "General",
};

const chatSlicer = createSlice({
  name: "chatSlicer",
  initialState,
  reducers: {
    setChatWith: (state, action: PayloadAction<Friend>) => {
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
  },
});

export const { setChatWith, setWebSocket, setActiveTab, setSettingsActiveTab } =
  chatSlicer.actions;
export default chatSlicer.reducer;
