import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

function Loading() {
	const { color } = useTheme();
	return (
		<View
			style={{ backgroundColor: color.background, flex: 1, height: '100%' }}
		/>
	);
}

export default Loading;
