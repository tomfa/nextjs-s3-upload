import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FileDrop } from "../component/FileDrop";
import {useCallback} from "react";

const Home: NextPage = () => {
  const onDrop = useCallback(async (files: File[]) => {
    console.log('Dropped file ' + String(files))
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS file upload with S3</title>
        <meta
          name="description"
          content="Example NextJS app with file upload to AWS S3"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Upload file</h1>

        <p className={styles.description}>uploaded file will be public</p>

        <div className={styles.grid}>
          <FileDrop onDrop={onDrop} />
        </div>
      </main>

    </div>
  );
};

export default Home;
