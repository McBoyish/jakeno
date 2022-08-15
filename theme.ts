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

export const theme = {
	...DefaultTheme,
	color: {
		primary: '#3F72AF',
		secondary: '#DBE2EF',
		background: '#F9F7F7',
		text: '#000000',
		black: '#000000',
		white: '#FFFFFF',
		hyperlink: '#0000EE',
		error: '#EE0000',
	},
	font: {
		size: {
			heading: 28,
			subheading: 20,
			primary: 16,
			secondary: 14,
			small: 10,
		},
		family: {
			text: 'Roboto',
			heading: 'Roboto',
		},
	},
};

export default theme;
