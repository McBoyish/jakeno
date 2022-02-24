import React, { useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import { Color } from 'types';
import { View } from 'react-native';
import LoginForm from './components/LoginForm';
import Logo from './components/Logo';
import StyleSheet from 'react-native-media-query';
import { useBreakPoints } from 'utils/responsive';

export default function Home() {
	const { isMediumScreen } = useBreakPoints();
	const { color } = useTheme();
	const { styles } = styleSheet(color, isMediumScreen);

	return (
		<View style={styles.container}>
			<Logo />
			<LoginForm />
		</View>
	);
}

const styleSheet = (color: Color, isMediumScreen: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: isMediumScreen ? 'row' : 'column',
			alignSelf: 'center',
			alignItems: 'center',
			justifyContent: 'space-evenly',
			backgroundColor: color.background,
			width: '100%',
			padding: 20,
		},
	});
