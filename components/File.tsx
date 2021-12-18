type Props = {
  id: string;
  src: string;
  name: string;
}
export const File = (file: Props) => {
  return (
    <div key={file.id} className="mr-2 inline-block">
      <div className="min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={file.src}
          className="cover img-"
        />
      </div>
      <div className="mt-4">
        <div>
          <h3 className="text-sm text-gray-700 text-ellipsis">
            <a href={file.src} className="text-ellipsis">
              <span aria-hidden="true" className="" />
              filename: {file.name}
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
};
