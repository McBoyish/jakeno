import type { AppProps } from 'next/app';
import React from 'react';
import { Portal } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import Head from 'next/head';
import { UserContextProvider } from 'src/common/context/UserContext';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{'Jakeno'}</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, interactive-widget=resizes-content'
				/>
			</Head>
			<PaperProvider theme={theme}>
				<UserContextProvider>
					<Portal.Host>
						<Component {...pageProps} />
					</Portal.Host>
				</UserContextProvider>
			</PaperProvider>
		</>
	);
}

export default App;

// test eee
