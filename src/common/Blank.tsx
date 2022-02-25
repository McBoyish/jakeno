import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

function Blank() {
	const { color } = useTheme();
	return <View style={{ backgroundColor: color.background, flex: 1 }} />;
}

export default Blank;
