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
      lg: 24,
      md: 20,
      sm: 16,
      xs: 14,
      xxs: 12,
    },
    family: {
      text: 'Comic Sans MS',
      heading: 'Comic Sans MS',
    },
  },
};

export default theme;
