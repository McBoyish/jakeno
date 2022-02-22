import type { NextPage } from 'next';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import StyleSheet from 'react-native-media-query';

const Error404Page: NextPage = () => {
  const { color, font } = useTheme();
  const { styles } = styleSheet(color, font);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Error 404: Page not found.'}</Text>
    </View>
  );
};

export default Error404Page;

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: color.background,
      padding: 20,
    },
    text: {
      fontSize: font.size.primary,
      fontFamily: font.family.heading,
      color: color.text,
      textAlign: 'left',
    },
  });
