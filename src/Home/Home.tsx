import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Color, LiveRoom } from 'types';
import { View } from 'react-native';
import JoinRoomForm from './components/JoinRoomForm';
import { useUserContext } from 'src/common/context/UserContext';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';
import CreateRoomModal from './components/CreateRoomModal';

const { md } = useMediaQueries();

export default function Home() {
	const [liveRooms, setLiveRooms] = useState<LiveRoom[]>([]);

	const { socket } = useUserContext();

	const { color } = useTheme();
	const { styles, ids } = styleSheet(color);

	useEffect(() => {
		console.log(liveRooms);
	}, [liveRooms]);

	useEffect(() => {
		socket.emit('join-home', (liveRooms: LiveRoom[]) => {
			setLiveRooms(liveRooms);
		});

		socket.on('joined-room', (roomName: string) => {
			console.log('someone joined', roomName);
			socket.emit('update-live-rooms', (liveRooms: LiveRoom[]) => {
				console.log('updated', liveRooms);
				setLiveRooms(liveRooms);
			});
		});

		socket.on('left-room', (roomName: string) => {
			console.log('someone left', roomName);
			socket.emit('update-live-rooms', (liveRooms: LiveRoom[]) => {
				setLiveRooms(liveRooms);
			});
		});

		return () => {
			socket.removeAllListeners();
			socket.emit('leave-home');
		};
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
