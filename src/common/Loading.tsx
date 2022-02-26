import React from 'react';
import { useTheme, ActivityIndicator } from 'react-native-paper';

function Loading() {
	const { color } = useTheme();
	return (
		<ActivityIndicator
			color={color.primary}
			style={{
				backgroundColor: color.background,
				flex: 1,
			}}
		/>
	);
}

export default Loading;
