import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Color, Message } from 'types';
import { useTheme } from 'react-native-paper';
import MessageBubble from './MessageBubble';
import DateBubble from './DateBubble';
import { parseDate } from 'utils/date';
import StyleSheet from 'react-native-media-query';
import { useBreakPoints } from 'utils/responsive';
import { useVerticalScroll } from 'utils/useVerticalScroll';

interface MessageBoxProps {
  messages: Message[];
  setScrollToStart: (_: () => void) => void;
}

export default function MessageBox({ messages, setScrollToStart }: MessageBoxProps) {
  const { scrollRef, scrollToStart } = useVerticalScroll(0.75, true);
  const { color } = useTheme();
  const { isSmallScreen } = useBreakPoints();
  const { styles } = styleSheet(color, isSmallScreen);

  const separator = () => <View style={styles.separator} />;

  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const shouldAddSpacing =
      index < messages.length - 1 &&
      messages[index].user._id !== messages[index + 1].user._id;
    const shouldAddDate =
      index === messages.length - 1 ||
      parseDate(messages[index].date).date !== parseDate(messages[index + 1].date).date;
    if (shouldAddDate)
      return (
        <>
          <MessageBubble message={item} />
          <View style={styles.separator} />
          <View style={styles.separator} />
          <DateBubble date={item.date} />
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

  useEffect(() => {
    setScrollToStart(scrollToStart);
  }, [scrollToStart]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={separator}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        inverted
        disableVirtualization // this makes inverted work lol
      />
    </View>
  );
}

const styleSheet = (color: Color, isSmallScreen: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      flexGrow: 1,
      width: isSmallScreen ? 385 : '100%',
      height: '10vh', // it will grow to full size because of flex grow
      marginVertical: 5,
      padding: 10,
      borderRadius: 5,
      borderColor: color.primary,
      backgroundColor: color.tertiary,
    },
    separator: {
      height: 5,
    },
  });
