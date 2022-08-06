import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Color, LiveRoom } from 'types';
import { View } from 'react-native';
import JoinRoomForm from './components/JoinRoomForm';
import { useUserContext } from 'src/common/context/UserContext';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';
import CreateRoomModal from './components/CreateRoomModal';
import LiveRooms from './components/LiveRooms';

const { md } = useMediaQueries();

export default function Home() {
	const [liveRooms, setLiveRooms] = useState<LiveRoom[]>([]);

	const { socket } = useUserContext();

	const { color } = useTheme();
	const { styles, ids } = styleSheet(color);

	useEffect(() => {
		socket.emit('join-home', (liveRooms: LiveRoom[]) => {
			setLiveRooms(liveRooms);
		});
		socket.on('joined-room', () => {
			socket.emit('update-live-rooms', (liveRooms: LiveRoom[]) => {
				setLiveRooms(liveRooms);
			});
		});
		socket.on('left-room', () => {
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
		<View style={styles.container} dataSet={{ media: ids.container }}>
			<View style={styles.formContainer}>
				<JoinRoomForm />
			</View>
			<View style={styles.roomsContainer}>
				<LiveRooms liveRooms={liveRooms} />
			</View>
			<CreateRoomModal />
		</View>
	);
}

const styleSheet = (color: Color) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: color.background,
			alignContent: 'space-around',
			width: '100%',
			padding: 20,
			flexDirection: 'column',

			[md]: {
				flexDirection: 'row',
				alignItems: 'flex-start',
				justifyContent: 'space-around',
			},
		},

		formContainer: {
			margin: 20,
		},

		roomsContainer: {
			margin: 20,
		},
	});
