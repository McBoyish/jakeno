import React, { useEffect, useState } from 'react';
import MessageBox from './components/MessageBox';
import { View, Text } from 'react-native';
import { useRouter } from 'next/router';
import { useTheme } from 'react-native-paper';
import { io, uri } from 'server/socket';
import { InputMessage, Message, RoomData } from 'types';
import { sortByDate } from 'utils/date';
import { getRoom, isLocked } from 'server/routers';
import Loading from 'src/common/Loading';
import { Color, Font } from 'types';
import MessageInput from './components/MessageInput';
import CodeForm from './components/CodeForm';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';
import { Socket } from 'socket.io-client';

export default function Room() {
	const { user } = useUserContext();
	const router = useRouter();

	const [requireCode, setRequireCode] = useState(false);
	const [code, setCode] = useState<string>('');
	const [invalidCode, setInvalidCode] = useState(false);
	const [verified, setVerified] = useState(false);

	const [loading, setLoading] = useState(true);
	const [roomName, setRoomName] = useState<string>('');
	const [roomData, setRoomData] = useState<RoomData | null>(null);

	const [unknownError, setUnknownError] = useState(false);

	const [socket, setSocket] = useState<Socket | null>(null);
	const [messageSent, setMessageSent] = useState(false);
	const [scrollToStart, setScrollToStart] = useState<(() => void) | null>(null);

	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const getInitialData = async (roomName: string, code: string) => {
		try {
			const data = await getRoom(roomName, code);
			if (!data) {
				setLoading(false);
				return;
			}
			data.messages = sortByDate(data.messages);
			data && setRoomData(data);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			if (e.response && e.response.data.message === 'invalid-room-code') {
				setInvalidCode(true);
			} else {
				setUnknownError(true);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!router.isReady) return;

		const { pathname, query } = router;
		// remove any unwanted params
		router.replace(
			{ pathname, query: { roomName: query.roomName } },
			undefined,
			{ shallow: true }
		);

		const roomName = query.roomName as string;
		setRoomName(roomName);

		const setup = async () => {
			const res = await isLocked(roomName);
			if (!res) {
				// room does not exist
				setLoading(false);
				return;
			}
			if (res.locked) {
				setRequireCode(true);
				setLoading(false);
				return;
			} else {
				// room exists and not locked
				getInitialData(roomName, code);
			}
		};

		setup();
	}, [router.isReady]);

	useEffect(() => {
		if (!verified) return;
		setLoading(true);
		setRequireCode(false);
		getInitialData(roomName, code);
	}, [verified]);

	useEffect(() => {
		if (!roomData) return;

		const socket = io(uri);
		socket.emit('join-room', roomData._id);
		socket.on('message', (message: Message) => {
			addMessage(message);
		});
		setSocket(socket);

		return leaveRoom;
	}, [roomData]);

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

	if (loading) return <Loading />;

	if (unknownError)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{'An unknown error has occurred'}</Text>
			</View>
		);

	if (invalidCode)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{'Code is invalid'}</Text>
			</View>
		);

	if (requireCode)
		return (
			<View style={styles.container}>
				<CodeForm
					roomName={roomName}
					code={code}
					setCode={setCode}
					setVerified={setVerified}
				/>
			</View>
		);

	if (!roomData)
		return (
			<View style={styles.container}>
				<Text
					style={styles.text}
				>{`Room ${router.query.roomName} does not exist`}</Text>
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
