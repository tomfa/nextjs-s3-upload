import { APIFileResponse, FileDataDTO } from "../types";

export const uploadFile = async (
  file: File
): Promise<FileDataDTO> => {
  const fileName = file.name;
  const response = await fetch(`/api/s3_upload_url?filename=${fileName}`);
  const { data, error }: APIFileResponse = await response.json();
  if (error || !data) {
    throw new Error(error || 'Unexpected response');
  }
  await performS3Upload({ file, url: data.signedUrl });
  return data.file
};

const performS3Upload = ({ file, url }: { file: File; url: string }) =>
  new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve();
      }
    };
    xhr.onerror = () => {
      reject();
    };
    xhr.send(file);
  });
