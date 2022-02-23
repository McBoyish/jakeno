import type { AppProps } from 'next/app';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import Head from 'next/head';
import { UserContextProvider } from 'src/common/context/UserContext';
import NavBar from 'src/common/NavBar';
import { ScrollView } from 'react-native';
import { Wrapper } from 'src/common/Wrapper';

function App({ Component, pageProps }: AppProps) {
	return (
		<PaperProvider theme={theme}>
			<Head>
				<title>{'Random Stranger'}</title>
				<link rel='icon' href='/icon.png' />
			</Head>
			<Wrapper>
				<UserContextProvider>
					<NavBar />
					<ScrollView contentContainerStyle={{ flex: 1 }}>
						<Component {...pageProps} />
					</ScrollView>
				</UserContextProvider>
			</Wrapper>
		</PaperProvider>
	);
}

export default App;
