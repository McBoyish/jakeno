import React from 'react';
import { Text, View } from 'react-native';
import HyperLink from 'react-native-hyperlink';
import { Color, Font, Message } from 'types';
import { useTheme } from 'react-native-paper';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';

interface MessageBubbleProps {
	message: Message;
	messages: Message[];
	index: number;
}

function MessageBubble({ message, messages, index }: MessageBubbleProps) {
	const { user, loggedIn } = useUserContext();
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const date = new Date(message.createdAt);
	const dateString = date.toLocaleDateString();

	const isSelf = user.name === message.user.name;

	const shouldAddDate =
		message._id === messages[messages.length - 1]._id ||
		dateString !== new Date(messages[index + 1].createdAt).toLocaleDateString();

	return (
		<View>
			{shouldAddDate && (
				<View style={styles.dateContainer}>
					<View style={styles.line} />
					<Text style={styles.date} numberOfLines={1}>{`${dateString}`}</Text>
					<View style={styles.line} />
				</View>
			)}
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<HyperLink linkDefault linkStyle={styles.hyperlink}>
						<Text>
							{isSelf && loggedIn ? (
								<Text style={styles.username}>{`${message.user.name}:`}</Text>
							) : (
								<Text style={styles.username}>{`${message.user.name}:`}</Text>
							)}

							<View style={styles.spacing} />
							<Text style={styles.text}>{`${message.content}`}</Text>
						</Text>
					</HyperLink>
				</View>
			</View>
		</View>
	);
}

const separator = () => <View style={{ height: 5 }} />;

export const MemoizedSeparator = React.memo(separator, () => true);

export default React.memo(MessageBubble, (prev, next) => {
	const message = prev.message;
	const prevLength = prev.messages.length;
	const nextLength = next.messages.length;
	if (prevLength === nextLength) return true;
	return prev.messages[prevLength - 1]._id !== message._id;
});

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
		},

		usernameSelf: {
			fontFamily: font.family.text,
			fontSize: font.size.primary,
			color: color.secondary,
		},

		line: {
			height: 1,
			backgroundColor: color.primary,
			opacity: 0.5,
			flex: 1,
		},

		dateContainer: {
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			marginBottom: 5,
		},

		date: {
			fontFamily: font.family.text,
			fontSize: font.size.primary,
			color: color.text,
			marginHorizontal: 5,
		},

		textContainer: {
			flex: 1,
		},

		text: {
			fontFamily: font.family.text,
			fontSize: font.size.primary,
			color: color.text,
		},

		hyperlink: {
			color: color.hyperlink,
			textDecorationLine: 'underline',
		},

		spacing: {
			width: 5,
		},
	});
