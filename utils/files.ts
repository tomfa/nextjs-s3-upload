import config from "../config";
import { FileDataDTO } from "../types";

export const removeQueryFromUrl = (url: string) => {
  return url.split("?")[0];
};

export const getFileDataFromUrl = (url: string, modified = ""): FileDataDTO => {
  const endpoint = `${config.s3.endpointUrl}/`;
  if (!url.includes(endpoint)) {
    throw new Error(`Can not construct FileDataDTO from unknown URL ${url}`);
  }
  const cleanedUrl = removeQueryFromUrl(url)
  const key = cleanedUrl.split(endpoint).reverse()[0];
  const parts = key.split('/').filter(p => !!p)
  const filename = parts.reverse()[0]
  return {
    url: cleanedUrl,
    filename,
    modified,
    id: key
  };
};

export const getFileDataFromKey = (
  key: string,
  modified?: string
): FileDataDTO => getFileDataFromUrl(getAbsoluteUrlFromKey(key), modified);

export const getAbsoluteUrlFromKey = (key: string) =>
  `${config.s3.endpointUrl}/${key}`;
