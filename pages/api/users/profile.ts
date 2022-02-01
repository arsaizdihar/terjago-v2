import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "~/core/Prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "PUT":
      const session = await getSession({ req });
      if (!session) {
        return res.status(401);
      }
      const { name, major1, major2, majorType } = req.body;
      // TODO: check if major1Id and major2Id are valid
      try {
        await db.user.update({
          where: { id: session.user.id },
          data: {
            name,
            major1Id: major1,
            major2Id: major2,
            majorType,
          },
        });
        return res.status(200).json({ message: "success" });
      } catch (error) {
        return res.status(400).json({ message: "failed" });
      }
  }
};

export default handler;
