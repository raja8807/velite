import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

import styles from "../styles/Home.module.scss";
import fonts from "@/styles/fonts";
import Layout from "@/components/layout/layout";
import { auth, getLoggedInUser } from "@/libs/firebase/firebase";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      duration: 1500,
      once: false,
    });
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeStart", (...params) => {
      NProgress.start(params);
    });
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  const [session, setSession] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setSession(user);
    });
  }, []);

  // console.log(session);

  return (
    <>
      <main className={`${styles.main} ${fonts.MainFont}`}>
        <Layout session={session}>
          <Component {...pageProps} session={session} />
        </Layout>
      </main>
    </>
  );
}
