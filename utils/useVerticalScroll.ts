import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

export function useVerticalScroll() {
  const scrollRef = useRef<FlatList>(null);

  const onWheel = (e: any) => {
    if (!e || !scrollRef.current) return;
    e.preventDefault();
    const scrollFriction = 0.75; // 0 for no friction, 1 for full friction
    scrollRef.current.scrollToOffset({
      offset:
        scrollRef.current.getScrollableNode().scrollTop -
        (1 - scrollFriction) * e.deltaY,
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
  return scrollRef;
}
