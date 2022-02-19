import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MessageBox from './components/MessageBox';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { io, uri } from 'server/socket';
import { InputMessage, Message, RoomData, User } from 'types';
import { Color, Font } from 'types';
import MessageInput from './components/MessageInput';
import { sortByDate } from 'utils/date';
import StyleSheet from 'react-native-media-query';
import { getRoomData } from 'server/routers/roomRouter';
import useSessionStorage from 'utils/useSessionStorage';
import { Socket } from 'socket.io-client';

export default function Room() {
  const { getUser } = useSessionStorage();
  const router = useRouter();
  const [socket, setSocket] = useState<Socket>();
  const [user] = useState<User>(getUser());
  const [scrollToStart, setScrollToStart] = useState<() => void>();
  const [roomData, setRoomData] = useState<RoomData>({
    _id: '',
    name: '',
    messages: [],
  });
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { color, font } = useTheme();
  const { styles } = styleSheet(color, font);
  const { roomName } = router.query;

  useEffect(() => {
    setSocket(io(uri));
  }, []);

  useEffect(() => {
    if (socket && !isLoading) socket.emit('join-room', roomData._id);
  }, [isLoading]);

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (message: Message) => {
      addMessage(message);
    });
    return () => {
      socket.emit('leave-room', roomData._id as string);
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    let isMounted = true;
    const handleGetRoomData = async () => {
      const data = await getRoomData(roomName as string);
      if (data) {
        data.messages = sortByDate(data.messages);
        isMounted && setRoomData(data);
        isMounted && setIsLoading(false);
        return;
      }
      router.push(`/404`);
    };
    if (!user.name || !user._id) router.push('/404');
    if (roomName) handleGetRoomData();
    return () => {
      isMounted = false;
    };
  }, [roomName]);

  useEffect(() => {
    if (!scrollToStart) return;
    scrollToStart();
    setMessageSent(false);
  }, [messageSent]);

  const addMessage = (message: Message) => {
    setRoomData((prev) => {
      const data = {
        _id: prev._id,
        name: prev.name,
        messages: [message, ...prev.messages],
      };
      return data;
    });
  };

  const onSubmit = (text: string) => {
    if (!socket) return;
    const message: InputMessage = {
      userId: user._id,
      roomId: roomData._id,
      content: text,
    };
    socket.emit('message', message, (res: Message) => {
      addMessage(res);
      setMessageSent(true);
    });
  };

  return (
    <View style={styles.container}>
      {isLoading && <Text style={styles.text}>{'Loading...'}</Text>}
      {!isLoading && (
        <>
          <MessageBox messages={roomData.messages} setScrollToStart={setScrollToStart} />
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
