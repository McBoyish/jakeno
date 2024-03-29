import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Color, LiveRoom, Room } from 'types';
import { View } from 'react-native';
import JoinRoomForm from './components/JoinRoomForm';
import { useUserContext } from 'src/common/context/UserContext';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';
import LiveRooms from './components/LiveRooms';
import AllRooms from './components/AllRooms';
import CreateRoomModal from './components/CreateRoomModal';
import { CreateRoomModalContextProvider } from 'src/common/context/CreateRoomModalContext';

const { md } = useMediaQueries();

interface HomeProps {
	rooms: Room[];
}

export default function Home({ rooms }: HomeProps) {
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
		<CreateRoomModalContextProvider>
			<View>
				<View style={styles.container} dataSet={{ media: ids.container }}>
					<View
						style={styles.formContainer}
						dataSet={{ media: ids.formContainer }}
					>
						<JoinRoomForm />
						<View style={{ height: 50 }} />
						<LiveRooms liveRooms={liveRooms} />
					</View>
					<View
						style={styles.roomsContainer}
						dataSet={{ media: ids.roomsContainer }}
					>
						<AllRooms rooms={rooms} />
					</View>
				</View>
				<CreateRoomModal />
			</View>
		</CreateRoomModalContextProvider>
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
			justifyContent: 'space-evenly',

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
