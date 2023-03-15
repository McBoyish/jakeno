import React, { useEffect } from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { Color, Message } from 'types';
import { useTheme } from 'react-native-paper';
import MessageBubble, { MemoizedSeparator } from './MessageBubble';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';
import { container } from 'src/common/css';
import { useVerticalScroll } from 'utils/useVerticalScroll';

interface MessageBoxProps {
	messages: Message[];
	setScrollToStart: (_: () => void) => void;
	fetchMore: () => Promise<void>;
	hasMore: boolean;
	isFetching: boolean;
}

const { sm } = useMediaQueries();

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

	const renderItem = ({ item, index }: { item: Message; index: number }) => {
		return <MessageBubble message={item} messages={messages} index={index} />;
	};

	const handleOnEndReached = (info: { distanceFromEnd: number }) => {
		if (!hasMore || info.distanceFromEnd < 0 || isFetching) return;
		fetchMore().catch(console.error);
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			dataSet={{ media: ids.container }}
			behavior={'height'}
		>
			<FlatList
				data={messages}
				renderItem={renderItem}
				keyExtractor={item => item._id}
				ItemSeparatorComponent={MemoizedSeparator}
				scrollEnabled
				showsVerticalScrollIndicator={true}
				ref={scrollRef}
				// inverted
				disableVirtualization
				contentContainerStyle={{ padding: 10 }}
				onEndReached={handleOnEndReached}
				onEndReachedThreshold={0.5}
			/>
		</KeyboardAvoidingView>
	);
}

const styleSheet = (color: Color) =>
	StyleSheet.create({
		container: {
			...container,
			flexDirection: 'column',
			flexGrow: 1,
			width: '100%',
			height: 1, // hack
		},
	});
