import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CustomPrismaAdapter from "~/core/CustomPrismaAdapter";
import prismaClient from "~/core/Prisma";

export default NextAuth({
  adapter: CustomPrismaAdapter(prismaClient),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user = user as any;
      }
      return session;
    },
  },
});
