import type { NextApiRequest, NextApiResponse } from "next";
import {
  getDownloadUrl,
  getUploadUrl,
  listFiles,
} from "../../../storage/fileStorage";
import {
  APIFileResponse,
  APIListFileResponse,
  FileDataDTO,
} from "../../../types";
import deleteFileHandler from "./[filename]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return listFilesHandler(req, res);
  } else if (req.method === "PUT") {
    return getSignedUploadUrlHandler(req, res);
  }
  return res.status(405).send({ message: `Unknown method ${req.method}` });
}

const listFilesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIListFileResponse>
) => {
  const files = await listFiles({ folder: "default" });
  return res.json({ data: { files }, message: "OK" });
};

const getSignedUploadUrlHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIFileResponse>
) => {
  const filename = String(req.query.filename);
  if (!filename) {
    return res.status(400).send({
      message: "An error occured",
      error: 'Missing query parameter "filename',
    });
  }
  const { signedUrl, key } = await getUploadUrl({
    acl: "private",
    filename,
    folder: "default",
  });
  const url = await getDownloadUrl({ key });
  const file: FileDataDTO = {
    url,
    filename,
    modified: new Date().toISOString(),
    id: key,
  };

  return res.send({
    message: "OK",
    data: { signedUrl, file },
  });
};
