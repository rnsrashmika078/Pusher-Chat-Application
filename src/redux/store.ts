"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

import setNotify from "./NotifySlicer";
import ChatSlicer from "./chatSlicer";
import lastMessageSlicer from "./LastMessage";

const rootReducer = combineReducers({
  lastMessage: lastMessageSlicer,
  chat: ChatSlicer,
  notify: setNotify,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["lastMessage"], // ✅ only persist what you need
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type ReduxtState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
