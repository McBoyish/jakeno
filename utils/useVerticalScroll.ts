import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

export function useVerticalScroll(inverted?: boolean) {
	const scrollRef = useRef<FlatList>(null);

	const scrollToStart = () => {
		if (!scrollRef.current) return;
		scrollRef.current.scrollToOffset({ offset: 0, animated: false });
	};

	return { scrollRef, scrollToStart };
}
