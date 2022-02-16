import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Color, Message } from '../../../types';
import { useTheme } from 'react-native-paper';
import MessageBubble from './MessageBubble';
import DateBubble from './DateBubble';
import { parseDate } from '../../../utils/parseDate';

interface MessageBoxProps {
  messages: Message[];
}

export default function MessageBox({ messages }: MessageBoxProps) {
  const { color } = useTheme();
  const styles = styleSheet(color);

  const separator = () => <View style={styles.separator} />;
  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    if (index === messages.length - 1) return <MessageBubble message={item} />;
    if (index === 0)
      return (
        <>
          <DateBubble date={item.date} />
          <View style={styles.separator} />
          <MessageBubble message={item} />
        </>
      );
    const shouldAddDate =
      parseDate(messages[index].date).date !==
      parseDate(messages[index + 1].date).date;
    if (shouldAddDate)
      return (
        <>
          <MessageBubble message={item} />
          <View style={styles.separator} />
          <DateBubble date={messages[index + 1].date} />
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
