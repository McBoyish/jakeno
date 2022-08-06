import React, { useEffect, useState } from 'react';
import MessageBox from './components/MessageBox';
import { View, Text } from 'react-native';
import { useRouter } from 'next/router';
import { useTheme } from 'react-native-paper';
import { InputMessage, Message, Room as Room_, RoomData, User } from 'types';
import { sortByDate } from 'utils/date';
import { getRoom, isPrivate } from 'server/routers';
import Loading from 'src/common/Loading';
import { Color, Font } from 'types';
import MessageInput from './components/MessageInput';
import Users from './components/Users';
import CodeForm from './components/CodeForm';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';

export default function Room() {
	const { user, socket } = useUserContext();
	const router = useRouter();

	const [requireCode, setRequireCode] = useState(false);
	const [code, setCode] = useState<string>('');
	const [verified, setVerified] = useState(false);

	const [roomData, setRoomData] = useState<RoomData | null>(null);
	const [roomName, setRoomName] = useState<string>('');
	const [users, setUsers] = useState<User[] | null>(null);
	const [usersVisible, setUsersVisible] = useState(false);

	const [loading, setLoading] = useState(true);
	const [invalidCode, setInvalidCode] = useState(false);
	const [unknownError, setUnknownError] = useState(false);

	const [scrollToStart, setScrollToStart] = useState<(() => void) | null>(null);

	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	useEffect(() => {
		return () => {
			socket.removeAllListeners();
			socket.emit('leave-room');
		};
	}, []);

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
		setup(roomName);
	}, [router.isReady]);

	useEffect(() => {
		if (!verified) return;
		setLoading(true);
		setRequireCode(false);
		getInitialData(roomName, code);
	}, [verified]);

	const attachListeners = (room: Room_) => {
		socket.emit('join-room', room, (users: User[]) => {
			setUsers(users);
		});
		socket.on('join-room', (users: User[]) => {
			setUsers(users);
		});
		socket.on('leave-room', (users: User[]) => {
			setUsers(users);
		});
		socket.on('message', addMessage);
	};

	const getInitialData = async (roomName: string, code: string) => {
		try {
			const data = await getRoom(roomName, code);
			if (!data) {
				setLoading(false);
				return;
			}
			data.messages = sortByDate(data.messages);
			data && setRoomData(data);

			const room = { ...data, messages: undefined } as Room_;
			attachListeners(room);
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

	const setup = async (roomName: string) => {
		const res = await isPrivate(roomName);
		if (!res) {
			// room does not exist
			setLoading(false);
			return;
		}

		if (res.private) {
			// room exists and is private
			const codeFromSession = sessionStorage.getItem(roomName);
			sessionStorage.removeItem(roomName);
			if (codeFromSession) {
				getInitialData(roomName, codeFromSession);
			} else {
				setRequireCode(true);
				setLoading(false);
			}
		} else {
			// room exists and not private
			getInitialData(roomName, '');
		}
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
		if (!roomData) return;

		const message: InputMessage = {
			userId: user._id,
			roomId: roomData._id,
			content: text,
		};

		socket.emit('message', message, (res: Message) => {
			addMessage(res);
			scrollToStart && scrollToStart();
		});
	};

	if (loading) return <Loading />;

	if (unknownError)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{'An unknown error has occurred'}</Text>
			</View>
		);

	// ideally invalid code error will never happen
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

	if (roomData && users)
		return (
			<View style={styles.container}>
				<View
					style={{
						flex: 1,
					}}
				>
					<Users
						users={users}
						usersVisible={usersVisible}
						setUsersVisible={setUsersVisible}
					/>
					<MessageBox
						messages={roomData.messages}
						setScrollToStart={setScrollToStart}
					/>
					<MessageInput onSubmit={onSubmit} />
				</View>
			</View>
		);

	return <Loading />;
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
