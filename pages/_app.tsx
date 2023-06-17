import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

import { Navbar } from "components/navbar";
import { Footer } from "components/footer";

import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Niklas Fischer</title>
        <meta name='description' content='The portfolio of Niklas Fischer' />
        <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1' />
        <meta httpEquiv='Permissions-Policy' content='interest-cohort=()' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ThemeProvider enableSystem={true} attribute='class'>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
