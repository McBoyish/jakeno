import type { AppProps } from 'next/app';
import React from 'react';
import Layout from 'src/common/Layout';
import SEO from 'src/common/SEO';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<SEO />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default App;
