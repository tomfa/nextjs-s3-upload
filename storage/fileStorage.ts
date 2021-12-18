import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { fromEnv } from "@aws-sdk/credential-providers";
import config from "../config";

const credentials = fromEnv(); // reads env vars AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY
const s3 = new S3Client({ region: config.s3.region, credentials });

type GetUploadUrlProps = {
  owner: string;
  filename: string;
  acl?: "public-read" | "private";
  options?: { expiresIn?: number };
};
export const getUploadUrl = async ({
  owner,
  filename,
  acl = "public-read",
  options: { expiresIn = 15 * 60 } = {},
}: GetUploadUrlProps): Promise<{ signedUrl: string; key: string }> => {
  const key = `${owner}/${filename}`;
  const command = new PutObjectCommand({
    Bucket: config.s3.bucketName,
    Key: key,
    ACL: acl,
  });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn });
  return { signedUrl, key };
};
