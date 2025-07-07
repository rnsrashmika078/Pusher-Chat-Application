"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Params {
  currentTab: string;
  fakeUsers: fakeUser[];
  viewUser: User | null;
}
interface fakeUser {
  avatar: string;
  bio: string;
  email: string;
  fullname: string;
  username: string;
}
interface User {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  university: string;
}
const initialState: Params = {
  currentTab: "home",
  fakeUsers: [],
  viewUser: {
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    university: "",
  },
};

const feedSlicer = createSlice({
  name: "feedSlicer",
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
    setViewUser: (state, action: PayloadAction<User>) => {
      state.viewUser = action.payload;
    },
  },
});

export const { setCurrentTab, setViewUser } = feedSlicer.actions;
export default feedSlicer.reducer;
