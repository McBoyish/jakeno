import type { AppProps } from 'next/app';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from '../theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <PaperProvider theme={theme}>
      <Component {...pageProps} />
    </PaperProvider>
  );
}

export default App;
