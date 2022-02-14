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
    primary: '#1B262C',
    secondary: '#0F4C75',
    tertiary: '#3282B8',
    background: '#BBE1FA',
    text: '#1B262C',
    black: '#000000',
    white: '#FFFFFF',
  },
  font: {
    size: {
      lg: 20,
      md: 16,
      sm: 14,
      xs: 12,
      xxs: 8,
    },
    family: {
      text: 'Comic Sans MS',
      heading: 'Comic Sans MS',
    },
  },
};

export default theme;
