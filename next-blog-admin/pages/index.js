import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home({ name, posts }) {
  return (
    <div>
      {name}
      {JSON.stringify(posts)}
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiUrl = process.env.API_URL;
  const res = await fetch(`${apiUrl}/api/posts`);
  const posts = await res.json();
  return {
    props: { name: "bob", posts },
  };
};
