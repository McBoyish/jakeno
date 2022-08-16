import React from 'react';
import StyleSheet from 'react-native-media-query';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { Color, Font } from 'types';
import { useUserContext } from '../context/UserContext';
import { container } from '../css';
import { Text, StyleProp, ViewStyle, TextStyle, Pressable } from 'react-native';

interface ButtonProps {
	text: string;
	onClick: () => void;
	disabled?: boolean;
	loading?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	disableTouchOpacity?: boolean;
}

export default function Button({
	text,
	onClick,
	disabled,
	loading,
	containerStyle,
	textStyle,
	disableTouchOpacity,
}: ButtonProps) {
	const { userLoading } = useUserContext();

	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	return (
		<Pressable
			onPress={onClick}
			disabled={disabled || loading || userLoading}
			style={({ pressed }) => [
				styles.container,
				containerStyle,
				{ opacity: disableTouchOpacity || !pressed ? 1 : 0.5 },
			]}
		>
			{loading && <ActivityIndicator color={color.secondary} size={'small'} />}
			{!loading && <Text style={[styles.label, textStyle]}>{text}</Text>}
		</Pressable>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			...container,
			padding: 10,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: color.primary,
			height: 50,
			width: 250,
		},

		label: {
			fontSize: font.size.secondary,
			fontFamily: font.family.text,
			color: color.secondary,
		},
	});
