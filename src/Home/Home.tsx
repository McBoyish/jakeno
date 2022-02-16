import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'react-native-paper';
import Button from '../common/Button';
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
      <View style={styles.formContainer}>
        <Text style={styles.heading}>
          {'Join a room and start chatting with random strangers.'}
        </Text>
        <Text style={styles.subHeading}>
          {'Username limited to 18 characters.'}
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
            text={'Join'}
            disabled={
              username === '' || roomName === '' || username.length > 18
            }
            onClick={handleOnSubmit}
            width={300}
          />
        </View>
      </View>
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      backgroundColor: color.background,
      width: '100%',
      padding: 10,
    },
    formContainer: {
      marginVertical: 20,
      padding: 20,
      backgroundColor: color.secondary,
      borderRadius: 10,
      alignSelf: 'center',
      alignItems: 'center',
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
    subHeading: {
      fontSize: font.size.md,
      fontFamily: font.family.heading,
      color: color.text,
      textAlign: 'center',
    },
    textInput: {
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: font.size.sm,
      fontFamily: font.family.text,
      outlineStyle: 'none',
      borderColor: color.primary,
      backgroundColor: color.tertiary,
      height: 50,
      width: 300,
    },
  });
