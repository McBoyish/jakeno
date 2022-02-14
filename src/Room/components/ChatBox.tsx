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
  const renderItem2 = (item: MessageField, index: number) => {
    return (
      <View style={styles.messageContainer} key={index}>
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
      {/* {messages.map((message, index) => renderItem2(message, index))} */}
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
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
    messageContainer: {
      backgroundColor: color.white,
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
      color: color.primary,
    },
    content: {
      fontFamily: font.family.text,
      fontSize: font.size.sm,
      color: color.text,
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
