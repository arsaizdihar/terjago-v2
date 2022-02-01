import { NextApiResponse } from "next";

export const notFound = (res: NextApiResponse, message = "Not found") => {
  return res.status(404).json({ message });
};
