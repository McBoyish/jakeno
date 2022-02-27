import React from 'react';
import StyleSheet from 'react-native-media-query';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { Color, Font } from 'types';
import { useUserContext } from '../context/UserContext';
import {
	View,
	TouchableOpacity,
	Text,
	StyleProp,
	ViewStyle,
} from 'react-native';

interface ButtonProps {
	text: string;
	onClick: () => void;
	disabled: boolean;
	width?: number;
	height?: number;
	loading?: boolean;
	style?: StyleProp<ViewStyle>;
	dataSet?: {
		media: string;
	};
	backgroundColor?: string;
	textColor?: string;
}

export default function Button({
	text,
	onClick,
	disabled,
	width,
	height,
	loading,
	style,
	dataSet,
	backgroundColor,
	textColor,
}: ButtonProps) {
	const { userLoading } = useUserContext();
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font, width, height);

	return (
		<View style={[styles.container, style]} dataSet={dataSet}>
			<TouchableOpacity
				onPress={onClick}
				disabled={disabled || loading || userLoading}
				style={[
					styles.content,
					backgroundColor ? { backgroundColor } : undefined,
				]}
			>
				{loading && <ActivityIndicator color={color.black} />}
				{!loading && (
					<Text
						style={[styles.label, textColor ? { color: textColor } : undefined]}
					>
						{text}
					</Text>
				)}
			</TouchableOpacity>
		</View>
	);
}

const styleSheet = (
	color: Color,
	font: Font,
	width?: number,
	height?: number
) =>
	StyleSheet.create({
		container: {
			borderRadius: 5,
			backgroundColor: 'transparent',
			height: height || 50,
			width: width || 250,
		},

		content: {
			padding: 10,
			borderRadius: 5,
			backgroundColor: color.secondary,
			height: '100%',
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		},

		label: {
			fontSize: font.size.secondary,
			fontFamily: font.family.text,
			color: color.text,
		},
	});
