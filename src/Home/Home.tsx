import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, useTheme } from 'react-native-paper';
import { Color, Font } from '../../types';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { socket } from '../../server/socket';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const { color, font } = useTheme();
  const styles = styleSheet(color, font);

  const onChangeUsername = (text: string) => setUsername(text);
  const onChangeRoomName = (text: string) => setRoomName(text);
  const handleOnSubmit = () => {
    socket.emit(
      'join-room-request',
      username,
      roomName,
      async (userId: string, roomId: string) => {
        await router.push(`/room/${roomId}?userId=${userId}`);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {'Welcome! Join a room and start chatting with random strangers.'}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onChangeUsername}
          value={username}
          style={styles.textInput}
          placeholder={'Enter username'}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onChangeRoomName}
          value={roomName}
          style={styles.textInput}
          placeholder={'Enter room'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Button
          mode='contained'
          onPress={handleOnSubmit}
          disabled={username === '' || roomName === ''}
          style={[
            styles.button,
            username === '' || roomName === '' ? { opacity: 0.5 } : {},
          ]}
          labelStyle={styles.buttonLabel}
        >
          {'Join'}
        </Button>
      </View>
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: color.background,
      width: '100%',
      padding: 10,
    },
    inputContainer: {
      marginVertical: 5,
    },
    heading: {
      fontSize: font.size.lg,
      fontFamily: font.family.heading,
      color: color.text,
      textAlign: 'center',
    },
    text: {
      fontSize: font.size.sm,
      fontFamily: font.family.text,
    },
    textInput: {
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 5,
      fontSize: font.size.sm,
      fontFamily: font.family.text,
      height: 25,
      outlineStyle: 'none',
      borderColor: color.primary,
      backgroundColor: color.secondary,
    },
    button: {
      borderWidth: 2,
      borderRadius: 10,
      borderStyle: 'solid',
      borderColor: color.primary,
      backgroundColor: color.secondary,
      justifyContent: 'center',
      height: 25,
    },
    buttonLabel: {
      fontSize: font.size.xs,
      fontFamily: font.family.text,
      color: color.text,
    },
  });
