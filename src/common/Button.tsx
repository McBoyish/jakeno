import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import { Color, Font } from '../../types';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

export default function Button({ text, onClick, disabled }: ButtonProps) {
  const { color, font } = useTheme();
  const styles = styleSheet(color, font);

  return (
    <PaperButton
      mode={'text'}
      onPress={onClick}
      disabled={disabled}
      style={[styles.container, disabled ? { opacity: 0.5 } : {}]}
      labelStyle={styles.label}
      contentStyle={styles.content}
      uppercase={false}
    >
      {text}
    </PaperButton>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: 'transparent',
      height: 25,
    },
    content: {
      borderWidth: 2,
      borderRadius: 10,
      borderStyle: 'solid',
      borderColor: color.primary,
      backgroundColor: color.secondary,
      height: 25,
    },
    label: {
      fontSize: font.size.xs,
      fontFamily: font.family.text,
      color: color.text,
    },
  });
