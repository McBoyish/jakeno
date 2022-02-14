import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatBox from './components/ChatBox';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { socket } from '../../server/socket';
import { MessageField, InputMessage } from '../../types';
import { Color, Font } from '../../types';
import MessageInput from './components/MessageInput';
import sortByDate from '../../util/sortByDate';

export default function Room() {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageField[]>([]);
  const [state, setState] = useState({
    loading: true,
    error: false,
  });
  const { color, font } = useTheme();
  const styles = styleSheet(color, font);
  const { userId, roomId } = router.query;

  const onSubmit = (text: string) => {
    const message: InputMessage = {
      userId: userId as string,
      roomId: roomId as string,
      content: text,
    };
    socket.emit('message', message, (res: MessageField) => {
      setMessages((messages) => [res, ...messages]);
    });
  };

  useEffect(() => {
    if (roomId && userId) socket.emit('join-room', userId, roomId);
    socket.on('join-room-success', (messages: MessageField[]) => {
      setState({
        loading: false,
        error: false,
      });
      setMessages(sortByDate(messages));
    });
    socket.on('join-room-error', async () => {
      setState({
        loading: false,
        error: true,
      });
    });
    socket.on('message', (message: MessageField) => {
      setMessages((messages) => [message, ...messages]);
    });
    return () => {
      socket.emit('leave-room', roomId);
      socket.removeAllListeners();
    };
  }, [userId, roomId]);

  return (
    <View style={styles.container}>
      {state.loading && !state.error && (
        <Text style={styles.text}>{'Loading...'}</Text>
      )}
      {!state.loading && state.error && (
        <Text style={styles.text}>{'Page not found'}</Text>
      )}
      {!state.loading && !state.error && (
        <>
          <MessageInput onSubmit={onSubmit} />
          <ChatBox messages={messages} />
        </>
      )}
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      width: '100%',
      height: '100vh',
      backgroundColor: color.background,
      padding: 10,
    },
    text: {
      fontFamily: font.family.text,
      fontSize: font.size.md,
      color: color.text,
    },
  });
