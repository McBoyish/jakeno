import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import { useBreakPoints } from 'utils/responsive';
import StyleSheet from 'react-native-media-query';
import { getUserData } from 'server/routers/userRouter';
import useSessionStorage from 'utils/useSessionStorage';

export default function Form() {
  const { getUser, updateUser } = useSessionStorage();
  const { isSmallScreen } = useBreakPoints();
  const router = useRouter();
  const [username, setUsername] = useState<string>(getUser().name);
  const [roomName, setRoomName] = useState<string>('');
  const { color, font } = useTheme();
  const { styles } = styleSheet(color, font);

  const onChangeUsername = (value: string) => {
    setUsername(value);
    updateUser({
      name: value,
    });
  };

  const handleOnSubmit = async () => {
    const data = await getUserData(username);
    if (data) {
      updateUser({ _id: data._id });
      router.push(`/room/${roomName}`);
      return;
    }
    router.push(`/404`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {isSmallScreen ? 'Join a room and start chatting!' : 'Join a room!'}
        </Text>
        <Text style={styles.subHeading}>{'Username limited to 18 characters.'}</Text>
      </View>
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
          onChangeText={setRoomName}
          value={roomName}
          style={styles.textInput}
          placeholder={'Enter room'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={'Join'}
          disabled={username === '' || roomName === '' || username.length > 18}
          onClick={handleOnSubmit}
          width={225}
        />
      </View>
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      marginVertical: 5,
      padding: 20,
      backgroundColor: color.secondary,
      borderRadius: 5,
      alignSelf: 'center',
      alignItems: 'center',
    },
    headingContainer: {
      marginBottom: 15,
    },
    inputContainer: {
      marginVertical: 5,
    },
    buttonContainer: {
      marginVertical: 5,
    },
    heading: {
      fontSize: font.size.heading,
      fontFamily: font.family.heading,
      color: color.text,
      textAlign: 'center',
    },
    subHeading: {
      fontSize: font.size.subheading,
      fontFamily: font.family.heading,
      color: color.text,
      textAlign: 'center',
    },
    textInput: {
      borderRadius: 5,
      paddingHorizontal: 10,
      fontSize: font.size.primary,
      fontFamily: font.family.text,
      outlineStyle: 'none',
      borderColor: color.primary,
      backgroundColor: color.tertiary,
      height: 50,
      width: 225,
    },
  });
