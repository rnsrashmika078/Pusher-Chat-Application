export interface Friend {
  email: string;
  firstname: string;
  lastname: string;
  profilePicture?: string;
  lastmessage: string;
  recievedtime: string;
  unread: number;
}
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
}

export interface FriendRequest {
  from: string;
  senderId: string;
  message: string;
  targetUserId?: string;
}
