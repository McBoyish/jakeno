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
					content='width=device-width, initial-scale=0.5, interactive-widget=resizes-visual'
				/>
			</Head>
			<Portal.Host>
				<PaperProvider theme={theme}>
					<UserContextProvider>
						<Component {...pageProps} />
					</UserContextProvider>
				</PaperProvider>
			</Portal.Host>
		</>
	);
}

export default App;

// test eee
