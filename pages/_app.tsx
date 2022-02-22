import type { AppProps } from 'next/app';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import Head from 'next/head';
import { UserContextProvider } from 'src/common/context/UserContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <PaperProvider theme={theme}>
      <Head>
        <title>{'Random Stranger'}</title>
        <link rel='icon' href='/icon.png' />
      </Head>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </PaperProvider>
  );
}

export default App;
