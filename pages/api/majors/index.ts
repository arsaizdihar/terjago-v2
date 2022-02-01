import { NextApiHandler } from "next";
import db from "~/core/Prisma";
import { methodNotAllowed } from "~/server/responses/methodNotAllowed";
import { notFound } from "~/server/responses/notFound";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }
  const { universityId, majorType } = req.query;
  if (
    isNaN(Number(universityId)) ||
    !(majorType === "SOSHUM" || majorType === "SAINTEK")
  )
    return notFound(res);
  const majors = await db.major.findMany({
    where: {
      universityId: Number(universityId),
      majorType: majorType as any,
    },
    select: { id: true, name: true },
  });
  if (majors.length === 0) return notFound(res, "University is invalid");
  return res.status(200).json(majors);
};

export default handler;
