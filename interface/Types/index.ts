export interface SignUpData {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirm: string;
}
export interface SignInData {
  username: string;
  password: string;
}
export interface AiChat {
  title: string;
}
export interface User {
  _id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  profileImage?: string;
  coverImage?: string | null;
  token?: string;
  lastSeen?: Date;
}

export interface Friend {
  myId: string;
  userId: string;
  profileimage: string;
  username: string;
  firstname: string;
  lastname: string;
  lastMessage: string;
}
export interface Participant {
  userId: string;
  firstname: string;
  lastname: string;
}

export interface Conversation {
  userId: string;
  conversationId: string;
  otherUserId: string;
  userFname: string;
  userLname: string;
  otherUserFname: string;
  otherUserLName: string;
  lastMessage?: string;
  status?: "sent" | "delivered" | "seen";
  createdAt?: string;
  updatedAt?: string;
}

export interface Chat {
  conversationId: string;
  senderId: string;
  recieverId: string;
  message: string;
  status?: string;
  createdAt?: Date;
  saved?: boolean;
}
export interface StartChat {
  id: string;
  firstName: string;
  lastName: string;
  recieverId: string;
}
export interface Member {
  id: string;
  info: { firstname: string; lastname: string };
}
