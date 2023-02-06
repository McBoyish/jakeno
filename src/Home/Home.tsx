import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Color, LiveRoom, Room } from 'types';
import { View } from 'react-native';
import JoinRoomForm from './components/JoinRoomForm';
import { useUserContext } from 'src/common/context/UserContext';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';
import CreateRoomModal from './components/CreateRoomModal';
import LiveRooms from './components/LiveRooms';
import { getPublicRooms } from 'server/routers';
import AllRooms from './components/AllRooms';

const { md } = useMediaQueries();

export default function Home() {
	const [liveRooms, setLiveRooms] = useState<LiveRoom[]>([]);
	const [allRooms, setAllRooms] = useState<Room[]>([]);

	const { socket } = useUserContext();

	const { color } = useTheme();
	const { styles, ids } = styleSheet(color);

	useEffect(() => {
		getPublicRooms().then(rooms => {
			rooms && setAllRooms(rooms);
		});
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
			<View style={styles.formContainer} dataSet={{ media: ids.formContainer }}>
				<JoinRoomForm />
			</View>
			<View
				style={styles.roomsContainer}
				dataSet={{ media: ids.roomsContainer }}
			>
				<LiveRooms liveRooms={liveRooms} />
				<View style={{ height: 50 }} />
				<AllRooms rooms={allRooms} />
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
			width: '100%',
			padding: 10,
			flexDirection: 'column',
			// alignItems: 'center',
			justifyContent: 'space-around',

			[md]: {
				flexDirection: 'row',
			},
		},

		formContainer: {
			marginVertical: 20,

			[md]: {
				marginHorizontal: 20,
			},
		},

		roomsContainer: {
			marginVertical: 20,

			[md]: {
				marginHorizontal: 20,
			},
		},
	});
