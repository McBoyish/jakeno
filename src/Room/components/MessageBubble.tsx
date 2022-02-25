import React from 'react';
import { Text, View } from 'react-native';
import HyperLink from 'react-native-hyperlink';
import { Color, Font, Message } from 'types';
import { useTheme } from 'react-native-paper';
import { parseDate } from 'utils/date';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';

interface MessageBubbleProps {
	message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.username}>{message.user.name}</Text>
				<View style={styles.spacing} />
				<Text style={styles.timestamp}>
					{parseDate(message.createdAt).time}
				</Text>
			</View>
			<View style={styles.verticalSpacing} />
			<HyperLink linkDefault linkStyle={styles.hyperlink}>
				<Text style={styles.content}>{message.content}</Text>
			</HyperLink>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			backgroundColor: color.secondary,
			borderRadius: 5,
			paddingVertical: 5,
			paddingHorizontal: 7.5,
			minHeight: 50,
			minWidth: 50,
			maxWidth: '90%',
			justifyContent: 'center',
			alignSelf: 'flex-start',
		},

		headerContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
		},

		username: {
			fontFamily: font.family.text,
			fontSize: font.size.secondary,
			color: color.primary,
		},

		content: {
			fontFamily: font.family.text,
			fontSize: font.size.primary,
			color: color.text,
			textAlign: 'left',
		},

		timestamp: {
			fontFamily: font.family.text,
			fontSize: font.size.tertiary,
			opacity: 0.5,
		},

		hyperlink: {
			color: color.hyperlink,
			textDecorationLine: 'underline',
		},

		spacing: {
			width: 5,
		},

		verticalSpacing: {
			height: 3,
		},
	});
