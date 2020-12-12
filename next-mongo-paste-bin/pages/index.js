import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to Paste Bucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Paste Bucket</h1>
      <p>
        This is an application for people to upload and
        share various snippets of text.
      </p>

      <Button href="/create-snippet" variant="outline-info">
        Create a Snippet
      </Button>
    </div>
  );
}
