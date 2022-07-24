import React, { useEffect, useState } from 'react';
import MessageBox from './components/MessageBox';
import { View, Text } from 'react-native';
import { useRouter } from 'next/router';
import { useTheme } from 'react-native-paper';
import { io, uri } from 'server/socket';
import { InputMessage, Message, RoomData } from 'types';
import { Color, Font } from 'types';
import MessageInput from './components/MessageInput';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';
import { Socket } from 'socket.io-client';

interface RoomProps {
	initialRoomData: RoomData | null;
	invalidCode?: boolean;
	unknownError?: boolean;
}

export default function Room({
	initialRoomData,
	invalidCode,
	unknownError,
}: RoomProps) {
	const { user } = useUserContext();
	const router = useRouter();

	const [socket, setSocket] = useState<Socket>();
	const [roomData, setRoomData] = useState<RoomData | null>(initialRoomData);
	const [messageSent, setMessageSent] = useState(false);
	const [scrollToStart, setScrollToStart] = useState<(() => void) | null>(null);

	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	useEffect(() => {
		const { pathname, query } = router;
		const filteredQuery: Record<string, string> = {};
		query.roomName && (filteredQuery.roomName = query.roomName as string);
		query.code && (filteredQuery.code = query.code as string);
		router.replace(
			{
				pathname,
				query: filteredQuery,
			},
			undefined,
			{ shallow: true }
		);

		if (invalidCode || unknownError || !initialRoomData) return;

		const socket = io(uri);
		socket.emit('join-room', initialRoomData._id);
		socket.on('message', (message: Message) => {
			addMessage(message);
		});
		setSocket(socket);

		return leaveRoom;
	}, []);

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

	if (invalidCode)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{'Invalid code'}</Text>
			</View>
		);

	if (unknownError)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{'An unknown error has occurred'}</Text>
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
			justifyContent: 'center',
			width: '100%',
			backgroundColor: color.background,
			padding: 20,
		},

		text: {
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			color: color.text,
			textAlign: 'center',
		},
	});
