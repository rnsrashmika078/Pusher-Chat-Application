"use client";
import { configureStore } from "@reduxjs/toolkit";
import setNotify from "./NotifySlicer";
// import feedSlicer from "./FeedSlicer";
import EmailSlicer from "./emailSlicer";
import ChatSlicer from "./chatSlicer";
export const store = configureStore({
  reducer: {
    chat: ChatSlicer,
    inbox: EmailSlicer,
    notify: setNotify,
    // feed: feedSlicer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type ReduxtState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
