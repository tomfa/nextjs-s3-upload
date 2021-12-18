import Head from "next/head";
import { FileDrop } from "../components/FileDrop";
import { useCallback } from "react";

export default function Home() {
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

      <main className="items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className={"text-2xl"}>Upload file</h1>
        <p>File will be uploaded publicly</p>

        <div className="flex items-center max-w-4xl mt-6 sm:w-full m-auto">
          <FileDrop onDrop={onDrop} className={"w-full "} />
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
