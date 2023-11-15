import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/db/moongose";

const handler = NextAuth({
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.OAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials: any, req): Promise<any> {
        await connectToDatabase();
        if (credentials) {
          const user = await User.findOne({ email: credentials?.email });
          if (
            user &&
            bcrypt.compareSync(credentials?.password, user.password)
          ) {
            const User = {
              id: JSON.stringify(user._id).split('"')[1],
              image: user.avatar,
              name: user.name,
              email: user.email,
              username: user.username,
            };
            return User;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Modifies the default session to better fit our application's user structure.
    async session({ session, token }) {
      const user: User | null = await User.findOne({ _id: token.sub });

      // @ts-ignore
      session.user.id = token.sub;
      // @ts-ignore
      session.user.username = user.username;

      return session;
    },

    async jwt({ token, account, profile }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
