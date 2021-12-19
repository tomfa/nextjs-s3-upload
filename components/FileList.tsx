import { FileDataDTO } from "../types";

type Props = { files: FileDataDTO[]; onDelete: (file: FileDataDTO) => void };
export default function FileList({ files, onDelete }: Props) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 id="files-heading" className="sr-only">
          Files
        </h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {files.map((file) => (
            <div a key={file.id} >
              <a href={file.url} className={"group"}>
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    src={file.url}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>filename: {file.filename}</h3>
                </div>
              </a>
              <button
                onClick={() => onDelete(file)}
                className="mt-1 text-xs italic text-red-500 hover:text-red-800"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
