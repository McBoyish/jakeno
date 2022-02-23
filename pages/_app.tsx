import type { AppProps } from 'next/app';
import React from 'react';
import { Provider as PaperProvider, Portal } from 'react-native-paper';
import theme from 'theme';
import Head from 'next/head';
import { UserContextProvider } from 'src/common/context/UserContext';
import NavBar from 'src/common/NavBar';
import { ScrollView } from 'react-native';

function App({ Component, pageProps }: AppProps) {
	return (
		<PaperProvider theme={theme}>
			<Head>
				<title>{'Random Stranger'}</title>
				<link rel='icon' href='/icon.png' />
			</Head>
			<UserContextProvider>
				<NavBar />
				<ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
					<Component {...pageProps} />
				</ScrollView>
			</UserContextProvider>
		</PaperProvider>
	);
}

export default App;
