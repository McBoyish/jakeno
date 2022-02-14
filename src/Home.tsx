import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Text, Button, TextInput, View } from 'react-native';
import { socket } from '../server/socket';

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const handleOnClick = () => {
    socket.emit(
      'join-room-request',
      userName,
      roomName,
      async (userId: string, roomId: string) => {
        await router.push(`/room/${roomId}?userId=${userId}`);
      }
    );
  };
  const onUserChange = (text: string) => {
    setUserName(text);
  };
  const onRoomNameChange = (text: string) => {
    setRoomName(text);
  };
  return (
    <View>
      <View style={{ margin: 5 }}>
        <Text style={{ fontSize: 22 }}>
          {
            'Welcome! Please enter a username (minimum length 3) to start chatting with random strangers.'
          }
        </Text>
      </View>
      <View>
        <View>
          <Text>
            {'Enter a username: '}
            <TextInput onChangeText={onUserChange} value={userName} />
          </Text>
        </View>
        <View>
          <Text>
            {'Enter a room name: '}
            <TextInput onChangeText={onRoomNameChange} value={roomName} />
          </Text>
        </View>
        <View>
          <Button
            title={'Join a room'}
            onPress={handleOnClick}
            disabled={userName === '' || userName.length < 3}
          />
        </View>
      </View>
    </View>
  );
}
