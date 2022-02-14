import React from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { MessageField } from '../../../types';
import { Color, Font } from '../../../types';
import { useTheme } from 'react-native-paper';

interface ChatBoxProps {
  messages: MessageField[];
}

export default function ChatBox({ messages }: ChatBoxProps) {
  const { color, font } = useTheme();
  const styles = styleSheet(color, font);

  const renderItem = ({ item }: { item: MessageField }) => {
    return (
      <View style={styles.messageContainer}>
        <View style={styles.messageHeaderContainer}>
          <Text style={styles.username}>{item.userName}</Text>
          <View style={styles.spacing} />
          <Text style={styles.timestamp}>
            {`${new Date(item.date).toLocaleString('en-GB').slice(12, 17)}`}
          </Text>
        </View>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    );
  };
  const separator = () => <View style={styles.separator} />;

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

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: '100%',
      marginVertical: 5,
      padding: 10,
      borderWidth: 2,
      borderRadius: 10,
    },
    messageContainer: {
      backgroundColor: color.tertiary,
      borderRadius: 10,
      padding: 5,
      alignSelf: 'flex-start',
      maxWidth: '50%',
    },
    messageHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    username: {
      fontFamily: font.family.text,
      fontSize: font.size.xs,
    },
    content: {
      fontFamily: font.family.text,
      fontSize: font.size.sm,
      color: color.background,
    },
    timestamp: {
      fontFamily: font.family.text,
      fontSize: font.size.xxs,
    },
    separator: {
      height: 5,
    },
    spacing: {
      width: 25,
    },
  });
