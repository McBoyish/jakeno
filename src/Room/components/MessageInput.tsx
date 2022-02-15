import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { Color, Font } from '../../../types';

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
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder={'Message'}
        style={styles.textInput}
      />
      <View style={styles.separator} />
      <Button
        mode={'contained'}
        onPress={handleOnSubmit}
        disabled={text === ''}
        style={[styles.button, text === '' ? { opacity: 0.5 } : {}]}
        labelStyle={styles.buttonLabel}
      >
        {'Send'}
      </Button>
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      flexGrow: 0,
      width: '100%',
      marginVertical: 5,
    },
    textInput: {
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 5,
      fontSize: font.size.sm,
      fontFamily: font.family.text,
      height: 25,
      width: '100%',
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
    separator: {
      width: 5,
    },
  });
