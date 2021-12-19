import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteFile,
  getDownloadUrl,
  getUploadUrl,
  listFiles,
} from "../../../storage/fileStorage";
import {
  APIFileResponse,
  APIListFileResponse,
  FileDataDTO,
} from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIFileResponse>
) {
  if (req.method === "DELETE") {
    return deleteFileHandler(req, res);
  }
  return res.status(405).send({ message: `Unknown method ${req.method}` });
}

async function deleteFileHandler(
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
  const { error } = await deleteFile({ folder: "default", filename });
  if (error) {
    return res.status(500).send({ error, message: "An error occured" });
  }
  return res.json({ message: "OK" });
}
