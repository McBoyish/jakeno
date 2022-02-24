import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color } from 'types';
import { View } from 'react-native';
import JoinRoomForm from './components/JoinRoomForm';
import CreateRoomForm from './components/CreateRoomForm';
import StyleSheet from 'react-native-media-query';

export default function Home() {
	const { color } = useTheme();
	const { styles } = styleSheet(color);

	return (
		<View style={styles.container}>
			<View style={styles.sectionContainer}>
				<View style={styles.formContainer}>
					<JoinRoomForm />
				</View>
				<View style={styles.formContainer}>
					<CreateRoomForm />
				</View>
			</View>
		</View>
	);
}

const styleSheet = (color: Color) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignSelf: 'center',
			alignItems: 'flex-start',
			backgroundColor: color.background,
			width: '100%',
			padding: 20,
		},

		sectionContainer: {
			justifyContent: 'center',
			flexDirection: 'column',
		},

		formContainer: {
			margin: 20,
		},
	});
