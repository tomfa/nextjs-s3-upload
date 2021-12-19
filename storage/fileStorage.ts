import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { fromEnv } from "@aws-sdk/credential-providers";
import config from "../config";
import { mapGetFilesResponse } from "./fileStorage.mapper";
import { FileDataDTO } from "../types";

const credentials = fromEnv(); // reads env vars AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY
const s3 = new S3Client({ region: config.s3.region, credentials });

export const listFiles = async ({
  owner,
}: {
  owner: string;
}): Promise<FileDataDTO[]> => {
  const response = await s3.send(
    new ListObjectsCommand({
      Bucket: config.s3.bucketName,
      Prefix: `${owner}/`,
    })
  );
  const status = response.$metadata.httpStatusCode;
  if (status !== 200) {
    throw new Error(
      `Unexpected status code when listing ${config.s3.bucketName}/${owner}: ${status}`
    );
  }
  return mapGetFilesResponse(response);
};

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
