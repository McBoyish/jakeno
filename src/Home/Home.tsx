import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color } from 'types';
import { View } from 'react-native';
import JoinRoomForm from './components/JoinRoomForm';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';
import CreateRoomModal from './components/CreateRoomModal';

const { md } = useMediaQueries();

export default function Home() {
	const { color } = useTheme();
	const { styles, ids } = styleSheet(color);

	return (
		<View style={styles.container}>
			<View
				style={styles.sectionContainer}
				dataSet={{ media: ids.sectionContainer }}
			>
				<View style={styles.formContainer}>
					<JoinRoomForm />
				</View>
			</View>
			<CreateRoomModal />
		</View>
	);
}

const styleSheet = (color: Color) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignSelf: 'center',
			justifyContent: 'center',
			backgroundColor: color.background,
			width: '100%',
			padding: 20,
		},

		sectionContainer: {
			justifyContent: 'space-around',
			flexDirection: 'column',

			[md]: {
				flexDirection: 'row',
			},
		},

		formContainer: {
			margin: 20,
		},
	});
