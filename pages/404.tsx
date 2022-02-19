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
      <Text style={styles.subHeading}>{'Error 404: Page not found'}</Text>
      <Text style={styles.text}>
        {'An error has occurred. Please make sure to join a room with a username'}
      </Text>
    </View>
  );
};

export default Error404Page;

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: color.background,
      padding: 20,
    },
    subHeading: {
      fontSize: font.size.subheading,
      fontFamily: font.family.heading,
      color: color.text,
    },
    text: {
      fontFamily: font.family.text,
      fontSize: font.size.primary,
      color: color.text,
    },
  });
