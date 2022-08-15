import React from 'react';
import { Text, View } from 'react-native';
import HyperLink from 'react-native-hyperlink';
import { Color, Font, Message } from 'types';
import { useTheme } from 'react-native-paper';
import StyleSheet from 'react-native-media-query';

interface MessageBubbleProps {
	message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<HyperLink linkDefault linkStyle={styles.hyperlink}>
					<Text>
						<Text style={styles.username}>{`${message.user.name}`}</Text>
						<View style={styles.spacing} />
						<Text style={styles.text}>{`${message.content}`}</Text>
					</Text>
				</HyperLink>
			</View>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			maxWidth: '90%',
			flexDirection: 'row',
		},

		username: {
			fontFamily: font.family.text,
			fontSize: font.size.primary,
			color: color.primary,
			lineHeight: 16,
		},

		textContainer: {
			flex: 1,
		},

		text: {
			fontFamily: font.family.text,
			fontSize: font.size.primary,
			color: color.text,
			lineHeight: 16,
			flexWrap: 'wrap',
		},

		hyperlink: {
			color: color.hyperlink,
			textDecorationLine: 'underline',
		},

		spacing: {
			width: 5,
		},
	});
