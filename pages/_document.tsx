/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
// @ts-ignore
import { AppRegistry } from 'react-native-web';
// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: { renderPage: any }) {
    AppRegistry.registerComponent('Random Stranger', () => Main);
    const { getStyleElement } = AppRegistry.getApplication('Random Stranger');
    const page = await renderPage();
    const styles = [
      <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement(),
    ];
    return { ...page, styles: Children.toArray(styles) };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
