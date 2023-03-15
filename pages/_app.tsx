import type { AppProps } from 'next/app';
import React from 'react';
import { Portal } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import { Head } from 'next/document';
import { UserContextProvider } from 'src/common/context/UserContext';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name='description'
					content={
						'Create new public or private rooms where you can chat with other people, anonymously or by registering an account!'
					}
				/>
				<meta
					name='keywords'
					content={
						'join room, create room, chat, message, username, login, register, jakeno, private, public, chat room, room'
					}
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, interactive-widget=resizes-content'
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
