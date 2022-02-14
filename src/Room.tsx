/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatBox from './ChatBox';
import { View, TextInput, Text, Button } from 'react-native';
import { socket } from '../server/socket';
import { MessageField, InputMessage } from '../types';

export default function Room() {
  const router = useRouter();
  const { userId, roomId } = router.query;
  const [messages, setMessages] = useState<MessageField[]>([]);
  const [state, setState] = useState({
    loading: true,
    error: false,
  });
  const [text, setText] = useState<string>('');
  const onTextChange = (text: string) => {
    setText(text);
  };
  const handleOnClick = () => {
    const message: InputMessage = {
      userId: userId as string,
      roomId: roomId as string,
      content: text,
    };
    socket.emit('message', message, (res: MessageField) => {
      setMessages((messages) => [res, ...messages]);
      setText('');
    });
  };
  useEffect(() => {
    if (roomId && userId) socket.emit('join-room', userId, roomId);
    socket.on('join-room-success', (messages: MessageField[]) => {
      setState({
        loading: false,
        error: false,
      });
      setMessages(messages);
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
  if (state.loading) return <Text>{'Loading...'}</Text>;
  if (state.error) return <Text>{'Room/user is invalid'}</Text>;
  return (
    <View>
      {'Enter message: '}
      <TextInput onChangeText={onTextChange} value={text} />
      <Button title={'Send'} onPress={handleOnClick} disabled={text === ''} />
      <ChatBox messages={messages} />
    </View>
  );
}
