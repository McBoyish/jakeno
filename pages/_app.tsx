import type { AppProps } from 'next/app';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import Head from 'next/head';
import { UserContextProvider } from 'src/common/context/UserContext';
import NavBar from 'src/common/NavBar';
import { ScrollView, View } from 'react-native';
import { useWindowDimensions } from 'react-native';

function App({ Component, pageProps }: AppProps) {
	const { height } = useWindowDimensions();
	return (
		<PaperProvider theme={theme}>
			<Head>
				<title>{'Random Stranger'}</title>
				<link rel='icon' href='/ufo.png' />
			</Head>
			<UserContextProvider>
				<View style={{ height }}>
					<NavBar />
					<ScrollView
						style={{ flex: 1 }}
						contentContainerStyle={{ flexGrow: 1 }}
					>
						<Component {...pageProps} />
					</ScrollView>
				</View>
			</UserContextProvider>
		</PaperProvider>
	);
}

export default App;
