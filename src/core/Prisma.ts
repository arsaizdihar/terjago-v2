import { PrismaClient } from "@prisma/client";

const client = global.Prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.Prisma = client;
}

export default client;

declare global {
  var Prisma: PrismaClient | undefined;
}
