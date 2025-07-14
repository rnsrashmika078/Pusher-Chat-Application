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

export interface EmailType {
  _id: string;
  from: string;
  to: string;
  header: string;
  body: string;
  html: string;
  subject: string;
}

export interface IContent {
  from: string;
  to: string;
  subject: string;
  body: string;
  header: string;
  html?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  color: string;
  model: string;
  category: string;
  images: ImgProperty[];
  stock: number;
  createdAt: string;
}

export interface LoadBody {
  loading: boolean;
  type: string;
}
