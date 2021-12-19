import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { fromEnv } from "@aws-sdk/credential-providers";
import config from "../config";
import { mapGetFilesResponse } from "./fileStorage.mapper";
import { FileDataDTO } from "../types";

const credentials = fromEnv(); // reads env vars AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY
const s3 = new S3Client({ region: config.s3.region, credentials });

export const deleteFile = async ({
  owner,
  filename,
}: {
  owner: string;
  filename: string;
}): Promise<{ success: boolean, error?: string }> => {
  const key = `${owner}/${filename}`;
  const response = await s3.send(
    new DeleteObjectCommand({
      Bucket: config.s3.bucketName,
      Key: key,
    })
  );
  const status = response.$metadata.httpStatusCode;
  if (status && status >= 300) {
    console.log(response)
    return { success: false, error: `Unexpected status code when delete ${config.s3.bucketName}/${key}: ${status}` }
  }
  return { success: true }
};

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
  if (status && status >= 300) {
    throw new Error(
      `Unexpected status code when listing ${config.s3.bucketName}/${owner}: ${status}`
    );
  }
  const filesWithoutSignedUrl = mapGetFilesResponse(response);

  return Promise.all(
    filesWithoutSignedUrl.map(async (file) => {
      const url = await getDownloadUrl({
        key: file.id,
      });
      return {
        ...file,
        url,
      };
    })
  );
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

type GetSignedUrlProps = {
  key: string;
  options?: { expiresIn?: number };
};
export const getDownloadUrl = async ({
  key,
  options: { expiresIn = 15 * 60 } = {},
}: GetSignedUrlProps): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: config.s3.bucketName,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn });
};
