import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Color, Message } from '../../../types';
import { useTheme } from 'react-native-paper';
import MessageBubble from './MessageBubble';

interface MessageBoxProps {
  messages: Message[];
}

export default function MessageBox({ messages }: MessageBoxProps) {
  const { color } = useTheme();
  const styles = styleSheet(color);

  const separator = () => <View style={styles.separator} />;
  const renderItem = ({ item }: { item: Message }) => {
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
      borderWidth: 2,
      borderRadius: 10,
      borderColor: color.primary,
      backgroundColor: color.secondary,
    },
    separator: {
      height: 5,
    },
  });
