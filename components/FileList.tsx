import { FileDataDTO } from "../types";

type Props = { files: FileDataDTO[]; onDelete: (file: FileDataDTO) => void };
export default function FileList({ files, onDelete }: Props) {
  return (
    <div className="bg-white">
      <div className="py-16 px-4 sm:py-6 sm:px-6 lg:px-8">
        <h2 id="files-heading" className="sr-only">
          Files
        </h2>

        <div className={"masonry-wrapper"}>
          {files.map((file) => (
            <div key={file.id} className={"masonry mb-4"}>
              <a href={file.url} className={"group block"}>
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    src={file.url}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
              </a>
              <div className="mt-2 flex flex-col justify-between text-base font-medium text-gray-900">
                <h3 className={'hover:underline mb-1'}>
                  <a href={file.url}>{file.filename}</a>
                </h3>
                <div className={"flex w-full justify-between"}>
                  <span className={"text-gray-500 text-xs block"}>
                    {new Date(file.modified).toISOString().substr(0, 10)}
                  </span>
                  <button
                    onClick={() => onDelete(file)}
                    className="mt-1 text-xs italic text-red-500 hover:text-red-800 hover:underline"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
