export interface ImgProperty {
  secure_url: string;
  public_id: string;
}
export interface User {
  _id: string;
  firstname?: string | null;
  lastname?: string | null;
  username?: string | null;
  email?: string | null;
  profileImage?: string | null;
  coverImage?: string | null;
  token?: string;
}

export interface IContent {
  from: string;
  to: string;
  subject: string;
  body: string;
  header: string;
  html?: string;
}

export interface LoadBody {
  loading: boolean;
  type: string;
}

interface GroupMember {
  userId: string;
  firstName: string;
  lastName: string;
}
export interface GroupMessage {
  _id: string;
  groupId: string;
  senderId: string;
  firstName: string;
  lastName: string;
  message: string;
  status: "delivered";
  createdAt: Date;
}
export interface Groups {
  _id: string;
  groupName: string;
  createdby: string;
  groupMembers: GroupMember[];
  avatar?: string;
}
export interface GroupMembers {
  userId: string;
  firstName: string;
  lastName: string;
}
export type MessageStatus = "sent" | "delivered" | "seen";
