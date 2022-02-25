import React from 'react';
import StyleSheet from 'react-native-media-query';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { Color, Font } from 'types';
import { View, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
	text: string;
	onClick: () => void;
	disabled: boolean;
	width?: number;
	loading?: boolean;
}

export default function Button({
	text,
	onClick,
	disabled,
	width,
	loading,
}: ButtonProps) {
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font, width);

	return (
		<View
			style={[
				styles.container,
				disabled || loading ? { opacity: 0.5 } : undefined,
			]}
		>
			<TouchableOpacity
				onPress={onClick}
				disabled={disabled}
				style={styles.content}
			>
				{loading && <ActivityIndicator color={color.black} />}
				{!loading && <Text style={styles.label}>{text}</Text>}
			</TouchableOpacity>
		</View>
	);
}

const styleSheet = (color: Color, font: Font, width?: number) =>
	StyleSheet.create({
		container: {
			borderRadius: 5,
			backgroundColor: 'transparent',
			height: 50,
			width: width,
		},

		content: {
			borderRadius: 5,
			borderStyle: 'solid',
			borderColor: color.primary,
			backgroundColor: color.primary,
			height: 50,
			width: width,
			justifyContent: 'center',
			alignItems: 'center',
		},

		label: {
			fontSize: font.size.secondary,
			fontFamily: font.family.text,
			color: color.text,
		},
	});
