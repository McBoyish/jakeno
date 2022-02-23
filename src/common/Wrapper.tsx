import React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Portal, useTheme } from 'react-native-paper';
import { Color } from 'types';
import StyleSheet from 'react-native-media-query';

interface WrapperProps {
	children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
	const [isBrowser, setIsBrowser] = useState(false);
	const { color } = useTheme();
	const { styles } = styleSheet(color);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	return isBrowser ? <Portal>{children}</Portal> : <View style={styles.container}>{children}</View>;
}

const styleSheet = (color: Color) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: color.background,
		},
	});
