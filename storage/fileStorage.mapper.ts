import { ListObjectsCommandOutput } from "@aws-sdk/client-s3";
import { FileDataDTO } from "../types";
import { getFileDataFromKey } from "../utils/files";

type ListObjectsType = {
  Key: string;
  LastModified: Date;
  Size: number;
};
export const mapGetFilesResponse = (
  output: ListObjectsCommandOutput
): FileDataDTO[] => {
  if (!output.Contents) {
    return [];
  }
  const filesAndFolders = output.Contents as ListObjectsType[];
  const files = filesAndFolders.filter((o) => o.Key && !o.Key.endsWith("/"));
  return files.map((file) =>
    getFileDataFromKey(file.Key, file.LastModified.toISOString())
  );
};
