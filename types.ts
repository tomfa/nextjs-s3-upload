export type FileDataDTO = {
  filename: string;
  url: string;
  modified: string;
  id: string;
};

export type APIResponse = {
  message: string;
  error?: string;
  data?: { uploadUrl: string; file: FileDataDTO };
}
