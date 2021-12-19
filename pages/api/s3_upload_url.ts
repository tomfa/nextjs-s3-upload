// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDownloadUrl, getUploadUrl } from "../../storage/fileStorage";
import { APIFileResponse, FileDataDTO } from "../../types";

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
  const { signedUrl, key } = await getUploadUrl({
    acl: "private",
    filename,
    owner: "default",
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
}
