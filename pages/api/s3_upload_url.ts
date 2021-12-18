// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUploadUrl } from "../../storage/fileStorage";
import { APIResponse, FileDataDTO } from "../../types";
import { getAbsoluteUrlFromKey } from "../../utils/files";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  const filename = String(req.query.filename);
  if (!filename) {
    return res.status(400).send({
      message: "An error occured",
      error: 'Missing query parameter "filename',
    });
  }
  const { signedUrl, key } = await getUploadUrl({
    acl: "public-read",
    filename,
    owner: "default",
  });
  const file: FileDataDTO = {
    url: getAbsoluteUrlFromKey(key),
    filename,
    modified: new Date().toISOString(),
    id: key,
  };

  return res.send({
    message: "OK",
    data: { signedUrl, file },
  });
}
