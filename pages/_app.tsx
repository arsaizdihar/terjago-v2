import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomHead from "~/components/common/CustomHead";
import Layout from "~/components/common/Layout";
import { PageDataProvider } from "~/core/pageData";
import "../styles/globals.css";
import "../styles/select_search.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (retryCount, error: any) => {
        if (error?.response && error?.response?.status in [401, 404]) {
          return false;
        }
        return retryCount < 5;
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const PageLayout = (Component as any).Layout || Layout;
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <PageDataProvider data={pageProps.data}>
          <CustomHead />
          <ToastContainer position="top-center" theme="light" />
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </PageDataProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
