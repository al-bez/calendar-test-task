import Head from "next/head";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <>
      <Head>
        <title>Arrimo Calendar</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Arrimo calendar" />
      </Head>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
