import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomHead from "~/components/common/CustomHead";
import Layout from "~/components/common/Layout";
import { PageDataProvider } from "~/core/pageData";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const PageLayout = (Component as any).Layout || Layout;
  return (
    <SessionProvider session={pageProps.session}>
      <PageDataProvider data={pageProps.data}>
        <CustomHead />
        <ToastContainer position="top-center" theme="light" />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </PageDataProvider>
    </SessionProvider>
  );
}

export default MyApp;
