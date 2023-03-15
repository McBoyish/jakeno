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
			<Html style={{ height: '100%' }}>
				<Head>
					<title>{'Jakeno'}</title>
					<link rel='icon' href='/ufo.png' />
					<link
						href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
						rel='stylesheet'
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
