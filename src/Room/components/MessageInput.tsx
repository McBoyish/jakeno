import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Color, Font } from '../../../types';
import Button from '../../common/Button';

interface MessageInputProps {
  onSubmit: (text: string) => void;
}

export default function MessageInput({ onSubmit }: MessageInputProps) {
  const [text, setText] = useState<string>('');
  const { color, font } = useTheme();
  const styles = styleSheet(color, font);

  const onChangeText = (text: string) => setText(text);
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
      marginVertical: 5,
    },
    textInput: {
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: font.size.sm,
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
