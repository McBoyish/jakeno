import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Color, Room } from 'types';
import { View } from 'react-native';
import JoinRoomForm from './components/JoinRoomForm';
import { getPublicRooms } from 'server/routers';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';
import CreateRoomModal from './components/CreateRoomModal';

const { md } = useMediaQueries();

export default function Home() {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [error, setError] = useState(false);

	const { color } = useTheme();
	const { styles, ids } = styleSheet(color);

	useEffect(() => {
		const init = async () => {
			const res = await getPublicRooms();
			if (!res) {
				setError(true);
				return;
			}
			setRooms(res);
		};
		init().catch(console.error);
	}, []);

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
