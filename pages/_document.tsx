/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
// @ts-ignore
import { AppRegistry } from 'react-native-web';
import { flush } from 'react-native-media-query';
// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
		height: 100%;
  }
`;

export default class MyDocument extends Document {
	static async getInitialProps({ renderPage }: { renderPage: any }) {
		AppRegistry.registerComponent('Jakeno', () => Main);
		const { getStyleElement } = AppRegistry.getApplication('Jakeno');
		const page = await renderPage();
		const styles = [
			<style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
			getStyleElement(),
			flush(),
		];
		return { ...page, styles: Children.toArray(styles) };
	}

	render() {
		return (
			<Html style={{ height: '100vh' }}>
				<Head>
					<title>{'Jakeno'}</title>
					<link rel='icon' href='/ufo.png' />
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
					<link
						href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
						rel='stylesheet'
					/>
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1.0, interactive-widget=resizes-content'
					/>
				</Head>
				<body style={{ height: '100%' }}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
