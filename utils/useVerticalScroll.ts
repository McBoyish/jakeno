/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

export function useVerticalScroll(scrollFriction: number, inverted?: boolean) {
  const scrollRef = useRef<FlatList>(null);

  const scrollToStart = () => {
    if (!scrollRef?.current) return;
    scrollRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const onWheel = (e: any) => {
    if (!e || !scrollRef?.current) return;
    e.preventDefault();
    const reverse = inverted ? -1 : 1;
    scrollRef.current.scrollToOffset({
      offset:
        scrollRef.current.getScrollableNode().scrollTop +
        reverse * ((1 - scrollFriction) * e.deltaY),
      animated: false,
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.getScrollableNode().addEventListener('wheel', onWheel);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current
          .getScrollableNode()
          .removeEventListener('wheel', onWheel);
      }
    };
  }, [scrollRef.current]);

  return { scrollRef, scrollToStart };
}
