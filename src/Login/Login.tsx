import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color } from 'types';
import { View } from 'react-native';
import LoginForm from './components/LoginForm';
import Title from './components/Title';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';

const { md } = useMediaQueries();

export default function Home() {
	const { color } = useTheme();
	const { styles, ids } = styleSheet(color);

	return (
		<View style={styles.container} dataSet={{ media: ids.container }}>
			<Title />
			<View style={styles.separator} dataSet={{ media: ids.separator }} />
			<LoginForm />
		</View>
	);
}

const styleSheet = (color: Color) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'column',
			alignSelf: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: color.background,
			width: '100%',
			padding: 20,

			[md]: {
				flexDirection: 'row',
				justifyContent: 'space-evenly',
			},
		},

		separator: {
			height: 15,

			[md]: {
				height: 0,
			},
		},
	});
