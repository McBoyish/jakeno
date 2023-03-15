import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Message } from 'types';
import MessageBubble, { MemoizedSeparator } from './MessageBubble';
import StyleSheet from 'react-native-media-query';
import { container } from 'src/common/css';
import { useVerticalScroll } from 'utils/useVerticalScroll';

interface MessageBoxProps {
	messages: Message[];
	setScrollToStart: (_: () => void) => void;
	fetchMore: () => Promise<void>;
	hasMore: boolean;
	isFetching: boolean;
}

export default function MessageBox({
	messages,
	fetchMore,
	hasMore,
	setScrollToStart,
	isFetching,
}: MessageBoxProps) {
	const { scrollRef, scrollToStart } = useVerticalScroll(true);

	const { styles, ids } = styleSheet();

	useEffect(() => {
		setScrollToStart(() => scrollToStart);
	}, []);

	const renderItem = ({ item, index }: { item: Message; index: number }) => {
		return <MessageBubble message={item} messages={messages} index={index} />;
	};

	const handleOnEndReached = (info: { distanceFromEnd: number }) => {
		if (!hasMore || info.distanceFromEnd < 0 || isFetching) return;
		fetchMore().catch(() => {
			// ?
		});
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
				contentContainerStyle={{ padding: 10 }}
				onEndReached={handleOnEndReached}
				onEndReachedThreshold={0.5}
			/>
		</View>
	);
}

const styleSheet = () =>
	StyleSheet.create({
		container: {
			...container,
			flexDirection: 'column',
			width: '100%',
			height: 500,
		},
	});
