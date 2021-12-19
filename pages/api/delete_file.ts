import type { NextApiRequest, NextApiResponse } from "next";
import { deleteFile, listFiles } from "../../storage/fileStorage";
import { APIFileResponse, APIListFileResponse } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIFileResponse>
) {
  const filename = String(req.query.filename);
  if (!filename) {
    return res.status(400).send({
      message: "An error occured",
      error: 'Missing query parameter "filename',
    });
  }
  const { error } = await deleteFile({ owner: "default", filename });
  if (error) {
    return res.status(500).send({ error, message: "An error occured" });
  }
  return res.json({ message: "OK " });
}
