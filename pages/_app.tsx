import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import Layout from 'src/common/Layout';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{'Random Stranger'}</title>
				<link rel='icon' href='/ufo.png' />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default App;
