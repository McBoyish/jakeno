import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import { Text, View } from 'react-native';
import StyleSheet from 'react-native-media-query';

export default function Logo() {
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	return (
		<View style={styles.container}>
			<View style={styles.headingContainer}>
				<Text style={styles.heading}>{'Random Stranger'}</Text>
			</View>
			<Text style={styles.description}>
				{'Start chatting with random strangers now.'}
			</Text>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
		},

		headingContainer: {
			marginBottom: 15,
		},

		heading: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			textAlign: 'center',
		},

		description: {
			fontSize: font.size.subheading,
			fontFamily: font.family.text,
			color: color.text,
			textAlign: 'center',
		},
	});
