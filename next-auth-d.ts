import { DefaultSession } from "next-auth";
// DefaultJWT
declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      firstname?: string | null;
      lastname?: string | null;
      username?: string | null;
      email?: string | null;
      profileImage?: string | null;
      coverImage?: string | null;
      token?: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
    firstname?: string | null;
    lastname?: string | null;
    username?: string | null;
    email?: string | null;
    profileImage?: string | null;
    coverImage?: string | null;
    token?: string;
  }
}

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     _id: string;
//     firstname?: string | null;
//     lastname?: string | null;
//     username?: string | null;
//     email?: string | null;
//     profileImage?: string | null;
//     coverImage?: string | null;
//     token?: string;
//   }
// }
