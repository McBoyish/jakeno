import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import Layout from 'src/common/Layout';
import { View } from 'react-native';

function App({ Component, pageProps }: AppProps) {
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<Head>
				<title>{'Random Stranger'}</title>
				<link rel='icon' href='/ufo.png' />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</View>
	);
}

export default App;
