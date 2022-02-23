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
	const { user, userLoading } = useUserContext();
	const router = useRouting();
	const [socket, setSocket] = useState<Socket>();
	const [roomData, setRoomData] = useState<RoomData>({
		_id: '',
		name: '',
		messages: [],
	});
	const [roomExists, setRoomExists] = useState<boolean>(false);
	const [roomLoading, setRoomLoading] = useState<boolean>(true);
	const [messageSent, setMessageSent] = useState<boolean>(false);
	const [scrollToStart, setScrollToStart] = useState<() => void>();
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);
	const roomName = router.getParam('roomName');

	useEffect(() => {
		setSocket(io(uri));
	}, []);

	useEffect(() => {
		let isMounted = true;
		const handleGetRoomData = async () => {
			const data = await getRoom(roomName as string);
			if (data) {
				data.messages = sortByDate(data.messages);
				if (!isMounted) return;
				setRoomData(data);
				setRoomExists(true);
			}
			setRoomLoading(false);
		};
		if (roomName) handleGetRoomData();
		return () => {
			isMounted = false;
		};
	}, [roomName]);

	useEffect(() => {
		if (socket && roomExists) socket.emit('join-room', roomData._id);
	}, [socket, roomExists]);

	useEffect(() => {
		if (!socket) return;
		socket.on('message', (message: Message) => {
			addMessage(message);
		});
		return () => {
			socket.emit('leave-room', roomData._id as string);
			socket.removeAllListeners();
			socket.disconnect();
		};
	}, [socket]);

	useEffect(() => {
		if (!scrollToStart || !messageSent) return;
		scrollToStart();
		setMessageSent(false);
	}, [scrollToStart, messageSent]);

	const addMessage = (message: Message) => {
		setRoomData(prev => {
			const data = {
				_id: prev._id,
				name: prev.name,
				messages: [message, ...prev.messages],
			};
			return data;
		});
	};

	const onSubmit = (text: string) => {
		if (!socket) return;
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

	if (userLoading || roomLoading)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{'Loading...'}</Text>
			</View>
		);

	if (!roomExists)
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.text}>{'Page not found'}</Text>
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
			alignItems: 'flex-start',
			width: '100%',
			height: '100vh',
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
			fontFamily: font.family.text,
			fontSize: font.size.primary,
			color: color.text,
			textAlign: 'left',
		},
	});
