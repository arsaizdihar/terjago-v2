import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import client from "~/core/Prisma";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.json({});
  }
  const user = await client.user.findFirst({
    where: { email: session.user?.email || "" },
  });
  return res.json(user);
};

export default handler;
