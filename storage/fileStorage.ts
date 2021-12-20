import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import config from "../config";
import { mapGetFilesResponse } from "./fileStorage.mapper";
import { FileDataDTO } from "../types";

const s3 = new S3Client({
  region: config.s3.region,
  credentials: config.s3.credentials,
});

export const deleteFile = async ({
  folder,
  filename,
}: {
  folder: string;
  filename: string;
}): Promise<{ success: boolean; error?: string }> => {
  const key = `${folder}/${filename}`;
  const response = await s3.send(
    new DeleteObjectCommand({
      Bucket: config.s3.bucketName,
      Key: key,
    })
  );
  const status = response.$metadata.httpStatusCode;
  if (status && status >= 300) {
    return {
      success: false,
      error: `Unexpected status code when delete ${config.s3.bucketName}/${key}: ${status}`,
    };
  }
  return { success: true };
};

export const listFiles = async ({
  folder,
}: {
  folder: string;
}): Promise<FileDataDTO[]> => {
  const response = await s3.send(
    new ListObjectsCommand({
      Bucket: config.s3.bucketName,
      Prefix: `${folder}/`,
    })
  );
  const status = response.$metadata.httpStatusCode;
  if (status && status >= 300) {
    throw new Error(
      `Unexpected status code when listing ${config.s3.bucketName}/${folder}: ${status}`
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
  folder: string;
  filename: string;
  acl?: "public-read" | "private";
  options?: { expiresIn?: number };
};
export const getUploadUrl = async ({
  folder,
  filename,
  acl = "public-read",
  options: { expiresIn = 15 * 60 } = {},
}: GetUploadUrlProps): Promise<{ signedUrl: string; key: string }> => {
  const key = `${folder}/${filename}`;
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
