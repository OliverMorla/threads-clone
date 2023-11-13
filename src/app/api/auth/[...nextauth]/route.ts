import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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
        // if (credentials) {
        //   const user = await prisma.users.findUnique({
        //     where: {
        //       email: credentials?.email,
        //     },
        //   });
        //   if (
        //     user &&
        //     bcrypt.compareSync(credentials?.password, user?.password ?? "")
        //   ) {
        //     const name =
        //       user.first_name && user.last_name
        //         ? user.first_name + " " + user.last_name
        //         : user.first_name;
        //     const User = {
        //       id: user.id,
        //       name: name,
        //       email: user.email,
        //     };
        //     return User;
        //   }
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  callbacks: {
    // Modifies the default session to better fit our application's user structure.
    async session({ session, user, token }) {
      //   const User = await prisma.users.findUnique({
      //     where: {
      //       id: Number(token.sub),
      //     },
      //     select: {
      //       role: true,
      //     },
      //   });

      //   // @ts-ignore
      //   session.user.id = Number(token.sub);
      //   // @ts-ignore
      //   session.user.role = User.role;
      return session;
    },

    async jwt({ token, account, profile }) {
      //   const user = await prisma.users.findUnique({
      //     where: {
      //       id: Number(token.sub),
      //     },
      //     select: {
      //       role: true,
      //       avatar_url: true,
      //     },
      //   });

      //   token.picture = user?.avatar_url;
      //   token.role = user?.role;

      return token;
    },
  },
});

export { handler as GET, handler as POST };
