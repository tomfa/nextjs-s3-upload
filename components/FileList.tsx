export default function FileList({ files }: { files: Array<{
    id: string;
    src: string;
    name: string;
  }>}) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 id="files-heading" className="sr-only">
          Files
        </h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {files.map((file) => (
            <a key={file.id} href={file.src} className="group">
              <div className="w-full rounded-lg overflow-hidden">
                <img
                  src={file.src}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                <h3>filename: {file.name}</h3>
              </div>
              <p className="mt-1 text-sm italic text-gray-500"></p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
