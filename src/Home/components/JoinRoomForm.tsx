import React from 'react';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouter } from 'next/router';
import { isLocked, verifyCode } from 'server/routers';
import { useCreateRoomModalContext } from 'src/common/context/CreateRoomModalContext';
import { useUserContext } from 'src/common/context/UserContext';

export default function JoinRoomForm() {
	const { userLoading, loggedIn } = useUserContext();
	const { showModal, hideModal } = useCreateRoomModalContext();
	const router = useRouter();

	const [roomName, setRoomName] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [code, setCode] = useState('');
	const [requireCode, setRequireCode] = useState(false);

	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const showError = (msg: string) => {
		setErrorMsg(msg);
		setTimeout(() => {
			setErrorMsg('');
		}, 3000);
	};

	const handleOnSubmitWithCode = async () => {
		setLoading(true);
		const res = await verifyCode(roomName, code);
		if (!res) {
			setLoading(false);
			showError('Cound not find room');
			return;
		}
		if (!res.valid) {
			setLoading(false);
			showError('Invalid code');
			return;
		}
		hideModal();
		router.push(`/room/${roomName}?code=${code}`);
	};

	const handleOnSubmit = async () => {
		setLoading(true);
		const res = await isLocked(roomName);
		if (res === null) {
			setLoading(false);
			showError('Cound not find room');
			return;
		}
		if (res.locked) {
			setLoading(false);
			setRequireCode(true);
		} else {
			hideModal();
			router.push(`/room/${roomName}`);
		}
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
						editable={!loading && !requireCode}
					/>
					{requireCode && <View style={{ height: 15 }} />}
					{requireCode && (
						<TextInput
							onChangeText={setCode}
							value={code}
							style={[styles.textInput, errorMsg ? styles.error : undefined]}
							placeholder={'Enter code'}
							editable={!loading}
						/>
					)}
				</View>
				<Button
					text={errorMsg || 'Join'}
					disabled={!roomName || (requireCode && !code) || errorMsg !== ''}
					onClick={requireCode ? handleOnSubmitWithCode : handleOnSubmit}
					width={225}
					height={50}
					loading={loading}
				/>
				<View style={{ height: 15 }} />
				{!requireCode && (
					<Button
						text={
							userLoading
								? '...'
								: loggedIn
								? 'Create a room'
								: 'Login to create room'
						}
						disabled={!loggedIn}
						onClick={showModal}
						width={225}
						height={50}
					/>
				)}
				{requireCode && (
					<Button
						text={'Back'}
						onClick={() => {
							setRequireCode(false);
							setCode('');
							setErrorMsg('');
						}}
						width={225}
						height={50}
					/>
				)}
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
