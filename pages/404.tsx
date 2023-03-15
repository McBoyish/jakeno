import type { NextPage } from 'next';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import StyleSheet from 'react-native-media-query';
import Layout from 'src/common/Layout';

const Error404Page: NextPage = () => {
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	return (
		<Layout>
			<View style={styles.container}>
				<Text style={styles.text}>{'Error 404: Page not found'}</Text>
			</View>
		</Layout>
	);
};

export default Error404Page;

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignSelf: 'center',
			width: '100%',
			justifyContent: 'center',
			backgroundColor: color.background,
			padding: 20,
		},

		text: {
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			color: color.text,
			textAlign: 'center',
		},
	});
