import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";

export default function CustomPrismaAdapter(
  ...args: Parameters<typeof PrismaAdapter>
): Adapter {
  const adapter = PrismaAdapter(...args);
  const prisma = args[0];
  adapter.getSessionAndUser = async (sessionToken) => {
    const userAndSession = await prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            majorType: true,
            emailVerified: true,
            role: true,
            name: true,
            major1: {
              select: {
                id: true,
                name: true,
                university: {
                  select: {
                    id: true,
                    name: true,
                    link: true,
                  },
                },
              },
            },
            major2: {
              select: {
                id: true,
                name: true,
                university: {
                  select: {
                    id: true,
                    name: true,
                    link: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!userAndSession) return null;
    const { user, ...session } = userAndSession;
    return { user, session };
  };
  return adapter;
}
