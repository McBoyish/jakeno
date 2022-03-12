import React from 'react';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouter } from 'next/router';
import { getRoom } from 'server/routers';
import { useCreateRoomModalContext } from 'src/common/context/CreateRoomModalContext';
import { useUserContext } from 'src/common/context/UserContext';

export default function JoinRoomForm() {
	const { userLoading, loggedIn } = useUserContext();
	const { showModal, hideModal } = useCreateRoomModalContext();
	const router = useRouter();
	const [roomName, setRoomName] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const handleOnSubmit = async () => {
		setLoading(true);
		const room = await getRoom(roomName);
		if (!room) {
			setLoading(false);
			setErrorMsg('Cound not find room');
			setTimeout(() => {
				setErrorMsg('');
			}, 3000);
			return;
		}
		hideModal();
		router.push(`/room/${roomName}`);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>{'Start chatting!'}</Text>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={setRoomName}
						value={roomName}
						style={[styles.textInput, errorMsg ? styles.error : undefined]}
						placeholder={'Enter room name'}
						editable={!loading}
					/>
				</View>
				<Button
					text={errorMsg || 'Join'}
					disabled={!roomName || errorMsg !== ''}
					onClick={handleOnSubmit}
					width={225}
					height={50}
					loading={loading}
				/>
				<View style={{ height: 15 }} />
				<Button
					text={
						userLoading
							? 'Loading'
							: loggedIn
							? 'Create a room'
							: 'Login to create room'
					}
					disabled={!loggedIn}
					onClick={showModal}
					width={225}
					height={50}
				/>
			</View>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			marginVertical: 5,
		},

		formContainer: {
			marginVertical: 5,
			padding: 20,
			backgroundColor: color.secondary,
			borderRadius: 5,
			alignItems: 'center',
			alignSelf: 'center',
		},

		inputContainer: {
			marginBottom: 15,
			alignItems: 'center',
		},

		heading: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			textAlign: 'center',
			marginBottom: 15,
		},

		textInput: {
			borderRadius: 5,
			paddingHorizontal: 10,
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			outlineStyle: 'none',
			backgroundColor: color.background,
			color: color.text,
			height: 50,
			width: 225,
		},

		error: {
			borderColor: color.error,
			borderWidth: 1,
		},
	});
