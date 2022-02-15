import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import { Color, Font } from '../../types';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  width?: number;
}

export default function Button({
  text,
  onClick,
  disabled,
  width,
}: ButtonProps) {
  const { color, font } = useTheme();
  const styles = styleSheet(color, font, width);

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

const styleSheet = (color: Color, font: Font, width?: number) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: 'transparent',
      height: 50,
      width: width,
    },
    content: {
      borderRadius: 10,
      borderStyle: 'solid',
      borderColor: color.primary,
      backgroundColor: color.primary,
      height: 50,
      width: width,
    },
    label: {
      fontSize: font.size.xs,
      fontFamily: font.family.text,
      color: color.text,
    },
  });
