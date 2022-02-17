import React from 'react';
import { Text, View } from 'react-native';
import { Color, Font } from 'src/common/types';
import { useTheme } from 'react-native-paper';
import { isToday } from 'utils/isToday';
import { isYesterday } from 'utils/isYesterday';
import { parseDate } from 'utils/parseDate';
import StyleSheet from 'react-native-media-query';

interface DateProps {
  date: string;
}

export default function DateBubble({ date }: DateProps) {
  const { color, font } = useTheme();
  const { styles } = styleSheet(color, font);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{`${
        isToday(date)
          ? 'Today'
          : isYesterday(date)
          ? 'Yesterday'
          : parseDate(date).date
      }`}</Text>
    </View>
  );
}

const styleSheet = (color: Color, font: Font) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.primary,
      borderRadius: 10,
      padding: 5,
      alignSelf: 'center',
    },
    date: {
      fontFamily: font.family.text,
      fontSize: font.size.tertiary,
      opacity: 0.5,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
  });
