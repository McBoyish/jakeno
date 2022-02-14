import React from 'react';
import { Text, View } from 'react-native';
import { MessageField } from '../types';
import sortByDate from '../util/sortByDate';

interface ChatBoxProps {
  messages: MessageField[];
}

export default function ChatBox({ messages }: ChatBoxProps) {
  return (
    <View>
      {sortByDate(messages).map((message, index) => {
        const date = new Date(message.date);
        return (
          <View key={index}>
            <Text>{`${message.userName}: ${message.content}`}</Text>
            <Text>{`${date.toLocaleString('en-GB')}`}</Text>
          </View>
        );
      })}
    </View>
  );
}
