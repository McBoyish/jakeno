import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HyperLink from 'react-native-hyperlink';
import { Color, Font, Message } from '../../../types';
import { useTheme } from 'react-native-paper';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { color, font } = useTheme();
  const styles = styleSheet(color, font);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.username}>{message.user.name}</Text>
        <View style={styles.spacing} />
        <Text style={styles.timestamp}>
          {`${new Date(message.date).toLocaleString('en-GB').slice(12, 17)}`}
        </Text>
      </View>
      <HyperLink linkDefault linkStyle={styles.hyperlink}>
        <Text style={styles.content}>{message.content}</Text>
      </HyperLink>
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.secondary,
      borderRadius: 10,
      padding: 10,
      alignSelf: 'flex-start',
      maxWidth: '50%',
    },
    headerContainer: {
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
    spacing: {
      width: 25,
    },
    hyperlink: {
      color: color.hyperlink,
      textDecorationLine: 'underline',
    },
  });
