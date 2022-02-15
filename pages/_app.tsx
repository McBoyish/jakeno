import type { AppProps } from 'next/app';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from '../theme';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <PaperProvider theme={theme}>
      <Head>
        <title>{'Random Stranger'}</title>
        <link rel='icon' href='/icon.png' />
      </Head>
      <Component {...pageProps} />
    </PaperProvider>
  );
}

export default App;
