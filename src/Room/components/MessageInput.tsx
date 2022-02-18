import React, { useState, useRef } from 'react';
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
import { useBreakPoints } from 'utils/responsive';

interface MessageInputProps {
  onSubmit: (text: string) => void;
}
type OnKeyPressEvent = NativeSyntheticEvent<TextInputKeyPressEventData>;

export default function MessageInput({ onSubmit }: MessageInputProps) {
  const textInputRef = useRef<TextInput>(null);
  const [text, setText] = useState<string>('');
  const { color, font } = useTheme();
  const { isSmallScreen } = useBreakPoints();
  const { styles } = styleSheet(color, font, isSmallScreen);

  const onChangeText = (text: string) => setText(text);

  const handleOnKeyPress = (e: OnKeyPressEvent) => {
    if (text === '') return;
    if (e.nativeEvent.key === 'Enter') handleOnSubmit();
  };

  const handleOnSubmit = () => {
    setText('');
    onSubmit(text);
  };

  const handleOnButtonPress = () => {
    if (textInputRef && textInputRef.current) textInputRef.current.focus();
    handleOnSubmit();
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder={'Message'}
        style={styles.textInput}
        onKeyPress={handleOnKeyPress}
        blurOnSubmit={false}
        ref={textInputRef}
      />
      <View style={styles.separator} />
      <Button
        text={'Send'}
        disabled={text === ''}
        onClick={handleOnButtonPress}
      />
    </View>
  );
}

const styleSheet = (color: Color, font: Font, isSmallScreen: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 0,
      width: isSmallScreen ? 385 : '100%',
      marginVertical: 5,
    },
    textInput: {
      borderRadius: 5,
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
