import { User as U } from "@/interface/Types";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import SignWithGoogle from "@/src/server_side/actions/GoogleSigns";
import UserSignIn from "@/src/server_side/actions/UserSignIn";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            // @ts-ignore
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password)
                    return null;
                const user = await UserSignIn({
                    username: credentials.username,
                    password: credentials.password,
                });
                return user || null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                if (account.provider === "google") {
                    const formData = new FormData();
                    formData.append("username", user.email || "");
                    formData.append(
                        "firstname",
                        user.name?.split(" ")[0] || ""
                    );
                    formData.append("lastname", user.name?.split(" ")[1] || "");
                    formData.append("email", user.email || "");
                    formData.append("profileimage", user.image || "");

                    SignWithGoogle(formData);

                    token._id = user.id;
                    token.firstname = user.name?.split(" ")[0] || "";
                    token.lastname = user.name?.split(" ")[1] || "";
                    token.username = user.email;
                    token.email = user.email;
                    token.profileImage = user.image;
                    token.coverImage = null;
                    token.token = account.access_token;
                } else {
                    // Credentials login
                    token._id = user._id;
                    token.firstname = user.firstname;
                    token.lastname = user.lastname;
                    token.username = user.username;
                    // token.email = user.email;
                    // token.profileImage = user.profileImage;
                    // token.coverImage = user.coverImage;
                    token.token = user.token;
                }
            }
            return token;
        },
        async session({ session, token }) {
            const typedToken = token as U;

            if (session.user) {
                session.user._id = typedToken._id || "";
                session.user.username = typedToken.username || "";
                session.user.firstname = typedToken.firstname || null;
                session.user.lastname = typedToken.lastname || null;
                session.user.email = typedToken.email || null;
                session.user.profileImage = typedToken.profileImage || null;
                session.user.coverImage = typedToken.coverImage || null;
                session.user.token = typedToken.token || "";
            }
            return session;
        },
    },
    pages: {
        signIn: "/api/auth/signup",
        // signOut: "/auth/logout",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
