import { FileDataDTO } from "../types";
import classNames from "classnames";

type Props = {
  files: FileDataDTO[];
  loadingFileNames: string[];
  loading: boolean;
  onDelete: (file: FileDataDTO) => void;
};
const dummyFile: FileDataDTO = {
  filename: "Loading...",
  modified: "",
  url: "",
  id: "",
};
export default function FileList({
  files,
  onDelete,
  loading,
  loadingFileNames,
}: Props) {
  return (
    <div className="bg-white">
      <div className="py-16 px-4 sm:py-6 sm:px-6 lg:px-8">
        <h2 id="files-heading" className="sr-only">
          Files
        </h2>

        <div className={"masonry-wrapper"}>
          {loadingFileNames &&
            loadingFileNames.map((filename) => (
              <FileComponent key={filename} file={{ ...dummyFile, filename, modified: 'Just now' }} loading />
            ))}
          {loading && (
            <>
              <FileComponent file={dummyFile} loading />
              <FileComponent file={dummyFile} loading />
              <FileComponent file={dummyFile} loading />
            </>
          )}
          {files.map((file) => (
            <FileComponent
              key={file.id}
              file={file}
              onDelete={() => onDelete(file)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const FileComponent = ({
  file,
  onDelete,
  loading,
}: {
  file: FileDataDTO;
  loading?: boolean;
  onDelete?: () => void;
}) => {
  return (
    <div
      key={file.id}
      className={classNames("masonry mb-4", { "animate-pulse": loading })}
    >
      <a href={file.url} className={"group block"}>
        <div
          className={classNames("w-full rounded-lg overflow-hidden", {
            "h-96 bg-gray-300": !file.url,
          })}
        >
          {file.url && (
            <img
              src={file.url}
              className="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          )}
        </div>
      </a>
      <div className="mt-2 flex flex-col justify-between text-base font-medium text-gray-900">
        <h3
          className={classNames("mb-1", {
            "animate-pulse": loading,
            "hover:underline": !loading,
          })}
        >
          {file.url && <a href={file.url}>{file.filename}</a>}
          {!file.url && <span>{file.filename}</span>}
        </h3>
        <div className={"flex w-full justify-between"}>
          <span className={"text-gray-500 text-xs block"}>
            {formatDateString(file.modified)}
          </span>
          {onDelete && (
            <button
              onClick={onDelete}
              className="mt-1 text-xs italic text-red-500 hover:text-red-800 hover:underline"
            >
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const formatDateString = (dateString: string) => {
  if (!dateString) {
    return ''
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString
  }
  return date.toISOString().substring(0, 10)
}
