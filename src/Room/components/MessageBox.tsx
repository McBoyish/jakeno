import React from 'react';
import { View, FlatList } from 'react-native';
import { Color, Message } from 'src/common/types';
import { useTheme } from 'react-native-paper';
import MessageBubble from './MessageBubble';
import DateBubble from './DateBubble';
import { parseDate } from 'utils/parseDate';
import StyleSheet from 'react-native-media-query';

interface MessageBoxProps {
  messages: Message[];
}

export default function MessageBox({ messages }: MessageBoxProps) {
  const { color } = useTheme();
  const { styles } = styleSheet(color);

  const separator = () => <View style={styles.separator} />;
  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const shouldAddSpacing =
      index > 0 && messages[index].user._id !== messages[index - 1].user._id;
    const shouldAddDate =
      index === 0 ||
      parseDate(messages[index].date).date !==
        parseDate(messages[index - 1].date).date;
    if (shouldAddDate)
      return (
        <>
          {index > 0 && <View style={styles.separator} />}
          <DateBubble date={item.date} />
          <View style={styles.separator} />
          <View style={styles.separator} />
          <MessageBubble message={item} />
        </>
      );
    if (shouldAddSpacing)
      return (
        <>
          <View style={styles.separator} />
          <MessageBubble message={item} />
        </>
      );
    return <MessageBubble message={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={separator}
        scrollEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styleSheet = (color: Color) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      flexGrow: 1,
      alignSelf: 'center',
      width: '100%',
      height: '50vh',
      marginVertical: 5,
      padding: 10,
      borderRadius: 10,
      borderColor: color.primary,
      backgroundColor: color.tertiary,
    },
    separator: {
      height: 5,
    },
  });
