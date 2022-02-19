/* eslint-disable @typescript-eslint/no-namespace */
import { DefaultTheme } from 'react-native-paper';
import { Color, Font } from './types';

declare global {
  namespace ReactNativePaper {
    interface Theme {
      color: Color;
      font: Font;
    }
  }
}

const theme = {
  ...DefaultTheme,
  color: {
    primary: '#F38181',
    secondary: '#FCE38A',
    tertiary: '#EAFFD0',
    background: '#95E1D3',
    text: '#000000',
    black: '#000000',
    white: '#FFFFFF',
    hyperlink: '#0000EE',
  },
  font: {
    size: {
      heading: 28,
      subheading: 20,
      primary: 16,
      secondary: 14,
      tertiary: 10,
    },
    family: {
      text: 'Roboto',
      heading: 'Roboto',
    },
  },
};

export default theme;
