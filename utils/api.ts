import useSWR from 'swr'
import {APIFileResponse, APIListFileResponse, FileDataDTO} from "../types";

const fetcher = (info: RequestInfo, init?: RequestInit) => fetch(info, init).then(res => res.json())

interface SWRResponse<T> {
  error: any,
  data: T,
  loading: boolean
}

export const useFiles = (
): SWRResponse<FileDataDTO[]> => {
  const { data, error } = useSWR<APIListFileResponse>(`/api/list_files`, fetcher)
  return {
    data: data?.data?.files || [],
    error,
    loading: !data && !error
  }
};

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
