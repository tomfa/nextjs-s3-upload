import type { NextApiRequest, NextApiResponse } from "next";
import { listFiles } from "../../storage/fileStorage";
import { APIListFileResponse } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIListFileResponse>
) {
  const files = await listFiles({ owner: "default" });
  return res.json({ data: { files }, message: "OK" });
}
