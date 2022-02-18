import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MessageBox from './components/MessageBox';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { socket } from 'server/socket';
import { InputMessage, Message } from 'src/common/types';
import { Color, Font } from 'src/common/types';
import MessageInput from './components/MessageInput';
import { sortByDate } from 'utils/date';
import StyleSheet from 'react-native-media-query';
import { useVerticalScroll } from 'utils/useVerticalScroll';

export default function Room() {
  const router = useRouter();
  const { scrollRef, scrollToStart } = useVerticalScroll(0.75, true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [state, setState] = useState({
    loading: true,
    error: false,
  });
  const { color, font } = useTheme();
  const { styles } = styleSheet(color, font);
  const { userId, roomId } = router.query;

  const onSubmit = (text: string) => {
    const message: InputMessage = {
      userId: userId as string,
      roomId: roomId as string,
      content: text,
    };
    socket.emit('message', message, (res: Message) => {
      setMessages((messages) => [res, ...messages]);
      setMessageSent(true);
    });
  };

  useEffect(() => {
    scrollToStart();
    setMessageSent(false);
  }, [messageSent]);

  useEffect(() => {
    if (roomId && userId) socket.emit('join-room', userId, roomId);
    socket.on('join-room-success', (messages: Message[]) => {
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
    socket.on('message', (message: Message) => {
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
          <MessageBox messages={messages} scrollRef={scrollRef} />
          <MessageInput onSubmit={onSubmit} />
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
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      backgroundColor: color.background,
      padding: 20,
    },
    text: {
      fontFamily: font.family.text,
      fontSize: font.size.primary,
      color: color.text,
    },
  });
