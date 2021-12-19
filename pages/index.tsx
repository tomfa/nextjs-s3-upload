import Head from "next/head";
import { FileDrop } from "../components/FileDrop";
import { useCallback, useMemo, useState } from "react";
import { File } from "../components/File";
import FileList from "../components/FileList";
import { deleteFile, uploadFile, useFiles } from "../utils/api";
import { FileDataDTO } from "../types";

export default function Home() {
  const { data: existingFiles, loading, error, mutate } = useFiles();
  const [loadingFileNames, setLoadingFileNames] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileDataDTO[]>([]);

  const files = useMemo(() => {
    const existingFileIds = existingFiles.map((f) => f.id);
    const nonDuplicateUploadedFiles = uploadedFiles.filter(
      (f) => !existingFileIds.includes(f.id)
    );
    return nonDuplicateUploadedFiles.reverse().concat(existingFiles);
  }, [uploadedFiles, existingFiles]);

  const onDeleteFile = useCallback(
    async (file: FileDataDTO) => {
      deleteFile(file);
      setUploadedFiles((existing) => existing.filter((e) => e.id !== file.id));
      mutate(existingFiles.filter((e) => e.id !== file.id));
    },
    [existingFiles, mutate]
  );

  const onDrop = useCallback(async (toUpload: File[]) => {
    await Promise.all(
      toUpload.map(async (file) => {
        setLoadingFileNames((names) => names.concat([file.name]));
        const data = await uploadFile(file);
        setLoadingFileNames((names) =>
          names.filter((name) => name !== file.name)
        );
        setUploadedFiles((files) => files.concat([data]));
      })
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-">
      <Head>
        <title>NextJS file upload with S3</title>
        <meta
          name="description"
          content="Example NextJS app with file upload to AWS S3"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="items-center justify-center w-full flex-1 px-20 mt-10 mb-10">
        <h1 className={"text-2xl"}>Upload file</h1>

        <div className="flex items-center mt-6 sm:w-full mb-10">
          <FileDrop onDrop={onDrop} className={"w-full"} />
        </div>

        <h1 className={"text-2xl"}>Uploaded files</h1>

        <div className="mt-3 mb-3 border-2">
          <FileList files={files} onDelete={onDeleteFile} />
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center hover:underline"
          href="https://github.com/tomfa/nextjs-s3-upload"
        >
          github.com/tomfa/nextjs-s3-upload
        </a>
      </footer>
    </div>
  );
}
