import React from 'react';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { exists } from 'server/routers';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouter } from 'next/router';
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

	const showError = (msg: string) => {
		setErrorMsg(msg);
		setTimeout(() => {
			setErrorMsg('');
		}, 3000);
	};

	const handleOnSubmit = async () => {
		setLoading(true);
		const res = await exists(roomName);
		if (!res) {
			showError('An error has occurred');
			setLoading(false);
			return;
		}
		if (!res.exists) {
			showError('Room not found');
			setLoading(false);
			return;
		}
		router.push(`/room/${roomName}`);
		hideModal();
	};

	return (
		<View>
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
					containerStyle={{ width: 225, height: 50 }}
					loading={loading}
				/>
				{loggedIn && <View style={{ height: 15 }} />}
				{loggedIn && (
					<Button
						text={'Create a room'}
						disabled={!loggedIn}
						onClick={showModal}
						containerStyle={{ width: 225, height: 50 }}
					/>
				)}
			</View>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		formContainer: {
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
