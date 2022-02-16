import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color, Font } from '../../types';
import { View, StyleSheet } from 'react-native';
import Form from './components/Form';
// import { socket } from '../../server/socket';

export default function Home() {
  const { color, font } = useTheme();
  const styles = styleSheet(color, font);

  return (
    <View style={styles.container}>
      <Form />
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
      padding: 20,
    },
  });
