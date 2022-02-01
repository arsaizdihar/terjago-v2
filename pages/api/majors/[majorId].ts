import { NextApiHandler } from "next";
import db from "~/core/Prisma";
import { methodNotAllowed } from "~/server/responses/methodNotAllowed";
import { notFound } from "~/server/responses/notFound";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }
  const { majorId } = req.query;
  const major = await db.major.findUnique({ where: { id: Number(majorId) } });
  if (!major) return notFound(res, "Major not found");
  return res.status(200).json(major);
};
export default handler;
