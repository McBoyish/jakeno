import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color } from 'types';
import { View } from 'react-native';
import CreateRoomForm from './components/CreateRoomForm';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';

const { md } = useMediaQueries();

export default function CreateRoom() {
	const { color } = useTheme();
	const { styles, ids } = styleSheet(color);

	return (
		<View style={styles.container}>
			<View
				style={styles.sectionContainer}
				dataSet={{ media: ids.sectionContainer }}
			>
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
