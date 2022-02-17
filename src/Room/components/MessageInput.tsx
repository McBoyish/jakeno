import React, { useState } from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'src/common/types';
import Button from 'src/common/Button';

interface MessageInputProps {
  onSubmit: (text: string) => void;
}
type OnKeyPressEvent = NativeSyntheticEvent<TextInputKeyPressEventData>;

export default function MessageInput({ onSubmit }: MessageInputProps) {
  const [text, setText] = useState<string>('');
  const { color, font } = useTheme();
  const { styles } = styleSheet(color, font);

  const onChangeText = (text: string) => setText(text);
  const handleOnKeyPress = (e: OnKeyPressEvent) => {
    if (text === '') return;
    if (e.nativeEvent.key === 'Enter') handleOnSubmit();
  };
  const handleOnSubmit = () => {
    setText('');
    onSubmit(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder={'Message'}
        style={styles.textInput}
        onKeyPress={handleOnKeyPress}
      />
      <View style={styles.separator} />
      <Button text={'Send'} disabled={text === ''} onClick={handleOnSubmit} />
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 0,
      width: '100%',
      alignSelf: 'center',
      marginVertical: 5,
    },
    textInput: {
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: font.size.primary,
      fontFamily: font.family.text,
      height: 50,
      width: '100%',
      outlineStyle: 'none',
      borderColor: color.primary,
      backgroundColor: color.tertiary,
    },
    separator: {
      width: 5,
    },
  });
