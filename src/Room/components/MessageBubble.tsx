import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HyperLink from 'react-native-hyperlink';
import { Color, Font, Message } from '../../../types';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'next/router';
import { parseDate } from '../../../utils/parseDate';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const router = useRouter();
  const { color, font } = useTheme();
  const styles = styleSheet(color, font);
  const { userId } = router.query;
  const isSelf = userId === message.user._id;

  if (!userId) return null;
  return (
    <View style={[styles.container, isSelf ? styles.right : styles.left]}>
      <View style={styles.headerContainer}>
        {!isSelf && <Text style={styles.username}>{message.user.name}</Text>}
        {!isSelf && <View style={styles.spacing} />}
        <Text style={styles.timestamp}>
          {`${parseDate(message.date).time}`}
        </Text>
      </View>
      <HyperLink linkDefault linkStyle={styles.hyperlink}>
        <Text style={[styles.content, isSelf ? { textAlign: 'right' } : {}]}>
          {message.content}
        </Text>
      </HyperLink>
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.secondary,
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      maxWidth: '90%',
    },
    left: {
      alignSelf: 'flex-start',
    },
    right: {
      alignSelf: 'flex-end',
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
      fontSize: font.size.xs,
      color: color.text,
      textAlign: 'left',
    },
    timestamp: {
      fontFamily: font.family.text,
      fontSize: font.size.xxs,
      opacity: 0.5,
    },
    hyperlink: {
      color: color.hyperlink,
      textDecorationLine: 'underline',
    },
    spacing: {
      width: 5,
    },
  });
