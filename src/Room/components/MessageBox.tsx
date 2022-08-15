import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Color, Message } from 'types';
import { useTheme } from 'react-native-paper';
import MessageBubble from './MessageBubble';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';
import { useVerticalScroll } from 'utils/useVerticalScroll';

interface MessageBoxProps {
	messages: Message[];
	setScrollToStart: (_: () => void) => void;
	fetchMore: () => Promise<void>;
	hasMore: boolean;
	isFetching: boolean;
}

const { sm } = useMediaQueries();

const MemoizedMessageBubble = React.memo(MessageBubble, () => true);

const renderItem = ({ item }: { item: Message; index: number }) => {
	return <MemoizedMessageBubble message={item} />;
};

const separator = () => <View style={{ height: 5 }} />;

const MemoizedSeparator = React.memo(separator, () => true);

export default function MessageBox({
	messages,
	fetchMore,
	hasMore,
	setScrollToStart,
	isFetching,
}: MessageBoxProps) {
	const { scrollRef, scrollToStart } = useVerticalScroll(true);

	const { color } = useTheme();
	const { styles, ids } = styleSheet(color);

	useEffect(() => {
		setScrollToStart(() => scrollToStart);
	}, []);

	const handleOnEndReached = (info: { distanceFromEnd: number }) => {
		if (!hasMore || info.distanceFromEnd < 0 || isFetching) return;
		fetchMore().catch(console.error);
	};

	return (
		<View style={styles.container} dataSet={{ media: ids.container }}>
			<FlatList
				data={messages}
				renderItem={renderItem}
				keyExtractor={item => item._id}
				ItemSeparatorComponent={MemoizedSeparator}
				scrollEnabled
				showsVerticalScrollIndicator={true}
				ref={scrollRef}
				inverted
				disableVirtualization
				contentContainerStyle={{ margin: 10 }}
				onEndReached={handleOnEndReached}
				onEndReachedThreshold={0.5}
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
			borderTopLeftRadius: 5,
			borderTopRightRadius: 5,
			backgroundColor: color.secondary,
			borderWidth: 2.5,
			borderColor: color.primary,
		},
	});
