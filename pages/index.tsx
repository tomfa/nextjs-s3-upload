import Head from "next/head";
import { FileDrop } from "../components/FileDrop";
import { useCallback, useMemo } from "react";
import { File } from "../components/File";
import FileList from "../components/FileList";

export default function Home() {
  const files = useMemo(
    () => [
      { id: "isd", src: "/system-log.png", name: "cheese" },
      { id: "isd", src: "/system-log.png", name: "cheese" },
      { id: "isd", src: "/system-log.png", name: "cheese" },
      { id: "isd", src: "/system-log.png", name: "cheese" },
      { id: "isd", src: "/system-log.png", name: "cheese" },
      { id: "isd", src: "/system-log.png", name: "cheese" },
    ],
    []
  );
  const onDrop = useCallback(async (files: File[]) => {
    console.log("Dropped file " + String(files));
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
        <p>File will be uploaded publicly</p>

        <div className="flex items-center mt-6 sm:w-full mb-10">
          <FileDrop onDrop={onDrop} className={"w-full"} />
        </div>

        <h1 className={"text-2xl"}>Uploaded files</h1>

        <div className="mt-3 mb-3 border-2">
          <FileList files={files} />
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
