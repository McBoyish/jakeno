import React, { useEffect, useState } from 'react';
import MessageBox from './components/MessageBox';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { io, uri } from 'server/socket';
import { InputMessage, Message, RoomData } from 'types';
import { Color, Font } from 'types';
import MessageInput from './components/MessageInput';
import { sortByDate } from 'utils/date';
import StyleSheet from 'react-native-media-query';
import { getRoom } from 'server/routers';
import { useUserContext } from 'src/common/context/UserContext';
import { Socket } from 'socket.io-client';
import { useRouting } from 'expo-next-react-navigation';

export default function Room() {
	const { user } = useUserContext();
	const router = useRouting();
	const [socket, setSocket] = useState<Socket>();
	const [loading, setLoading] = useState(true);
	const [roomData, setRoomData] = useState<RoomData | null>(null);
	const [messageSent, setMessageSent] = useState(false);
	const [scrollToStart, setScrollToStart] = useState<(() => void) | null>(null);
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);
	const roomName = router.getParam('roomName');

	useEffect(() => {
		return leaveRoom;
	}, []);

	useEffect(() => {
		if (!socket) return;
		socket.on('message', (message: Message) => {
			addMessage(message);
		});
	}, [socket]);

	useEffect(() => {
		let isMounted = true;
		const handleGetRoomData = async () => {
			if (!roomName) return;
			const data = await getRoom(roomName as string);
			if (isMounted && !data) {
				setLoading(false);
				return;
			}
			if (isMounted && data) {
				data.messages = sortByDate(data.messages);
				const socket = io(uri);
				socket.emit('join-room', data._id);
				setSocket(socket);
				setRoomData(data);
				setLoading(false);
			}
		};
		handleGetRoomData();
		return () => {
			isMounted = false;
		};
	}, [roomName]);

	useEffect(() => {
		if (!scrollToStart || !messageSent) return;
		scrollToStart();
		setMessageSent(false);
	}, [scrollToStart, messageSent]);

	const leaveRoom = () => {
		if (!socket || !roomData) return;
		socket.emit('leave-room', roomData._id);
		socket.removeAllListeners();
		socket.disconnect();
	};

	const addMessage = (message: Message) => {
		setRoomData(prev => {
			if (!prev) return null;
			return {
				...prev,
				messages: [message, ...prev.messages],
			};
		});
	};

	const onSubmit = (text: string) => {
		if (!socket || !roomData) return;
		const message: InputMessage = {
			userId: user._id,
			roomId: roomData._id,
			content: text,
		};
		socket.emit('message', message, (res: Message) => {
			addMessage(res);
			setMessageSent(true);
		});
	};

	if (loading)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{'Loading...'}</Text>
			</View>
		);

	if (!roomData)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{'Could not find room'}</Text>
			</View>
		);

	return (
		<View style={styles.container}>
			<>
				<MessageBox
					messages={roomData.messages}
					setScrollToStart={setScrollToStart}
				/>
				<MessageInput onSubmit={onSubmit} />
			</>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignSelf: 'center',
			alignItems: 'center',
			width: '100%',
			backgroundColor: color.background,
			padding: 20,
		},

		errorContainer: {
			flex: 1,
			alignSelf: 'center',
			alignItems: 'center',
			width: '100%',
			height: '100vh',
			backgroundColor: color.background,
			padding: 20,
		},

		text: {
			fontSize: font.size.subheading,
			fontFamily: font.family.text,
			color: color.text,
			textAlign: 'center',
		},
	});
