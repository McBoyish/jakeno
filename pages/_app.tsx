import type { AppProps } from 'next/app';
import React from 'react';
import { Portal } from 'react-native-paper';
import SEO from 'src/common/SEO';

function App({ Component, pageProps }: AppProps) {
	return (
		<Portal.Host>
			<SEO />
			<Component {...pageProps} />
		</Portal.Host>
	);
}

export default App;

// test eee
