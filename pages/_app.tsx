import type { AppProps } from 'next/app';
import React from 'react';
import { Portal } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import { UserContextProvider } from 'src/common/context/UserContext';

function App({ Component, pageProps }: AppProps) {
	return (
		<Portal.Host>
			<PaperProvider theme={theme}>
				<UserContextProvider>
					<Component {...pageProps} />
				</UserContextProvider>
			</PaperProvider>
		</Portal.Host>
	);
}

export default App;

// test eee
