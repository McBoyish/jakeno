import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Color, Message } from 'types';
import { useTheme } from 'react-native-paper';
import MessageBubble from './MessageBubble';
import DateBubble from './DateBubble';
import { parseDate } from 'utils/date';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';
import { useVerticalScroll } from 'utils/useVerticalScroll';

interface MessageBoxProps {
	messages: Message[];
	setScrollToStart: (_: () => void) => void;
}

const { sm } = useMediaQueries();

export default function MessageBox({
	messages,
	setScrollToStart,
}: MessageBoxProps) {
	const { scrollRef, scrollToStart } = useVerticalScroll(true);
	const { color } = useTheme();
	const { styles, ids } = styleSheet(color);

	useEffect(() => {
		setScrollToStart(scrollToStart);
	}, [scrollToStart]);

	const separator = () => <View style={styles.separator} />;

	const renderItem = ({ item, index }: { item: Message; index: number }) => {
		const shouldAddSpacing =
			index < messages.length - 1 &&
			messages[index].user._id !== messages[index + 1].user._id;
		const shouldAddDate =
			index === messages.length - 1 ||
			parseDate(messages[index].createdAt).date !==
				parseDate(messages[index + 1].createdAt).date;
		if (shouldAddDate)
			return (
				<>
					<MessageBubble message={item} />
					<View style={styles.separator} />
					<View style={styles.separator} />
					<DateBubble date={item.createdAt} />
					{index < messages.length - 1 && <View style={styles.separator} />}
				</>
			);
		if (shouldAddSpacing)
			return (
				<>
					<MessageBubble message={item} />
					<View style={styles.separator} />
				</>
			);
		return <MessageBubble message={item} />;
	};

	return (
		<View style={styles.container} dataSet={{ media: ids.container }}>
			<FlatList
				data={messages}
				renderItem={renderItem}
				keyExtractor={item => item._id}
				ItemSeparatorComponent={separator}
				scrollEnabled
				ref={scrollRef}
				inverted
				disableVirtualization
			/>
		</View>
	);
}

const styleSheet = (color: Color) =>
	StyleSheet.create({
		container: {
			flexDirection: 'column',
			flexGrow: 1,
			width: '100%',
			height: 1, // hack
			marginVertical: 5,
			padding: 10,
			borderRadius: 5,
			backgroundColor: color.primary,

			[sm]: {
				width: 385,
			},
		},

		separator: {
			height: 5,
		},
	});
