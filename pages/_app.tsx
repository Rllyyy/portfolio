import "styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "components/navbar";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Niklas Fischer</title>
        <meta name='description' content='The portfolio of Niklas Fischer' />
        <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ThemeProvider enableSystem={true} attribute='class'>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
