export type FileDataDTO = {
  filename: string;
  url: string;
  modified: string;
  id: string;
};

export type APIFileResponse = {
  message: string;
  error?: string;
  data?: { signedUrl: string; file: FileDataDTO };
}

export type APIListFileResponse = {
  message: string;
  error?: string;
  data?: { files: FileDataDTO[] };
}


export type ACL = 'public-read' | 'private'
